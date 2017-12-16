function checkPropagate(record, isChecked) {
    
    record.eachChild(function (node) {
        node.set('checked', isChecked);

       if (!node.isLeaf()) {
            checkPropagate(node, isChecked);
       }
    });

}


function _process (rec, id) {
    var deferred = new Ext.Deferred(); // create the Ext.Deferred object

    rec.set('visit_id', id);

    rec.save({
        callback: function (result, operation) {
            if (operation.exception) {
                deferred.reject(operation.exception);
            } else {
                deferred.resolve(result);
            }
        }
    }); 

    return deferred.promise;
}



Ext.define('App.view.visit.WizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.visitwizard',

    requires: ['Ext.util.Format'],

    checked: [],

    config: {
        risksLoaded: false
    },

    onMonEvaWizardActivate: function () {
        var me = this,
        vm = this.getViewModel(),
        rec = vm.get('record');        


    },

    onStatutChange: function (combo, value) {
        var me = this,
            vm = this.getViewModel(),
            rec = vm.get('record');

        var store = vm.get('products');
        var product = rec.getProduct() || store.getById(rec.get('product_id'));

        if (!product) {
            return;
        }

        var type = product.get('type'),
            has_edifice,
            CST_DIFFICULTE = 3,
            CST_OPERATIONNEL = 2;

        switch (type) {
            case 'Centre':
            case 'EPS':
            case 'Service public social':
            case 'Espace de sport':
                has_edifice = true;
                break;

            default:
                has_edifice = false;
        }

        rec.set('est_fonctionnel', value == CST_OPERATIONNEL);
        rec.set('has_maintenance', value == CST_OPERATIONNEL);
        rec.set('has_visibilite', value == CST_OPERATIONNEL);

        rec.set('est_satisfait', value != CST_DIFFICULTE); // satisfait for en cours

        rec.set('has_benef_cibles', (value == CST_OPERATIONNEL) ? true : null);


        if (type === 'AGR') {
            rec.set('est_viable', value == CST_OPERATIONNEL);
            rec.set('has_revenus', value == CST_OPERATIONNEL);
            rec.set('has_accompagnement', value == CST_OPERATIONNEL);

        } else {

            if (value != CST_OPERATIONNEL) {
                rec.set('qualite_prestations', null);
                rec.set('tarification', null);
                rec.set('tarif', null);
                rec.set('taux_utilisation', 0);

                rec.set('pop_benef_total_reel', 0);
                rec.set('pop_benef_homme_reel', 0);
                rec.set('pop_benef_femme_reel', 0);
                rec.set('pop_benef_jeune_reel', 0);

                if ( has_edifice ) {
                    rec.set('etat_batiment', null);
                    rec.set('etat_etancheite', null);       
                    rec.set('etat_plomberie', null);  
                    rec.set('etat_equipements', null); 
                    rec.set('qualite_hygiene', null);
                    rec.set('securite_centre', null);
            
                    rec.set('etat_personnel_encadrement', null);
                    rec.set('effectif_encadrement', 0);
            
                    rec.set('ressources_financieres', null);
                    rec.set('etat_capacite_accueil', null);
                    rec.set('capacite_accueil', 0);
            
                    rec.set('has_registre_beneficiaires', null);

                } else if ( type === 'Infrastructure' ) {
                    rec.set('has_mesures_maintenance', null);
                    rec.set('desserte', null);

                } else if ( type = 'Transport' ) {
                    rec.set('etat_vehicule', null);
                    rec.set('has_carnet_bord', null);
                    rec.set('has_registre_evacuation', null);
                    rec.set('has_police_assurance', null);
                    rec.set('has_etudes', null);
                }


                if (has_edifice || type === 'Autre') {
                    rec.set('etat_materiels', null);
                    rec.set('utilisation_equipements', null);
                }

            }
    
        }

    },

    onProductChange: function (combo, value) {
        var me = this,
            vm = this.getViewModel(),
            rec = vm.get('record'),

            missions = vm.get('missions'),
            
            userID = App.user.getId(),

            lastMission = missions && missions.first(),
            lastMissionID = lastMission && lastMission.getId();
            
        var emploischecklist = this.lookup('emploischecklist'),
            centreschecklist = this.lookup('centreschecklist'),
            transportchecklist = this.lookup('transportchecklist'),
            infrastructureschecklist = this.lookup('infrastructureschecklist'),
            equipementchecklist = this.lookup('equipementchecklist'),
            agrchecklist = this.lookup('agrchecklist'),
            prestationchecklist = this.lookup('prestationchecklist'),
            etudesChkBox = this.lookup('has_etudes'),
            accompagnementChkBox = this.lookup('has_accompagnement'),
            BPChkBox = this.lookup('has_BP'),
            foncierChkbox = this.lookup('foncierChkbox');

        var store = vm.get('products');

        var product = rec.getProduct() || store.getById(value);

        if (!product) {
            return;
        }

        var type = product.get('type'),
            has_edifice;

        switch (type) {
            case 'Centre':
            case 'EPS':
            case 'Service public social':
            case 'Espace de sport':
                has_edifice = true;
                break;

            default:
                has_edifice = false;
        }

        if (type !== 'Infrastructure') {
            emploischecklist.enable();
        } else {
            emploischecklist.disable();
        }

        if ( has_edifice ) {
            centreschecklist.enable();
        } else {
            centreschecklist.disable();
            foncierChkbox.hide();
        }

        if ( type === 'Transport') {
            transportchecklist.enable();
        } else {
            transportchecklist.disable();
        }

        if (type === 'Infrastructure') {
            infrastructureschecklist.enable();
        } else {
            infrastructureschecklist.disable();
        }

        if (type === 'AGR') {
            agrchecklist.enable();
            prestationchecklist.disable();

            accompagnementChkBox.show();
            BPChkBox.show();
            etudesChkBox.hide();
            foncierChkbox.hide();

        } else {
            agrchecklist.disable();
            prestationchecklist.enable();

            accompagnementChkBox.hide();
            BPChkBox.hide();
            etudesChkBox.show();
            foncierChkbox.show();
        }

        if (has_edifice || type === 'Autre') {
            equipementchecklist.enable();
        } else {
            equipementchecklist.disable();
        }


        if (!rec.isPhantom()) {
            return;
        }

        lastMissionID && rec.set('mission_id', lastMissionID);
        userID && rec.set('assignee_id', userID);
        rec.set('startDate', Ext.Date.clearTime(new Date()));

        me._setDefaultValues(value);
    },


    _setDefaultValues: function (productId) {
        var me = this,
            vm = this.getViewModel(),
            rec = vm.get('record');

        var store = vm.get('products');

        var product = rec.getProduct() || store.getById(productId);

        if (!product) {
            return;
        }

        var type = product.get('type'),
            has_edifice;

        switch (type) {
            case 'Centre':
            case 'EPS':
            case 'Service public social':
            case 'Espace de sport':
                has_edifice = true;
                break;

            default:
                has_edifice = false;
        }


        var creationDate = product.get('date_creation'),
            visitDate = rec.get('startDate') || new Date(),
            age = Math.round((visitDate - creationDate) / ( 366 * 24 * 3600000 )) || 3;

        if (type === 'AGR') {

            rec.set('age', age);
            rec.set('est_viable', true);
            rec.set('has_accompagnement', true);
            rec.set('has_revenus', true);
            rec.set('has_maintien_benefs_initiaux', true);

        } else {
            var tarif = product.get('tarif_moyen');

            rec.set('qualite_prestations', 1);
            rec.set('tarification', (tarif > 0) ? 1 : 0);
            rec.set('tarif', tarif);
            rec.set('taux_utilisation', 100);

            rec.set('pop_benef_total_reel', product.get('pop_benef_total_reel'));
            rec.set('pop_benef_homme_reel', product.get('pop_benef_homme_reel'));
            rec.set('pop_benef_femme_reel', product.get('pop_benef_femme_reel'));
            rec.set('pop_benef_jeune_reel', product.get('pop_benef_jeune_reel'));

            if ( has_edifice ) {
                rec.set('has_assiette_fonciere_apuree', true);
                rec.set('etat_batiment', ( age > 2 ) ? 2 : 3);
                rec.set('etat_etancheite', ( age > 2 ) ? 2 : 3);               
                rec.set('etat_plomberie', ( age > 2 ) ? 2 : 3);  
                rec.set('etat_equipements', ( age > 2 ) ? 2 : 3);  
                rec.set('qualite_hygiene', 1);
                rec.set('securite_centre', 1);
        
                rec.set('etat_personnel_encadrement', 1);
                rec.set('effectif_encadrement', product.get('staff'));
        
                rec.set('ressources_financieres', 1);
                rec.set('etat_capacite_accueil', 1);
                rec.set('capacite_accueil', product.get('capacite_accueil'));
        
                rec.set('has_eau', true);
                rec.set('has_electricite', true);
                rec.set('has_assainissement', true);
                rec.set('has_accessibilite', true);
                rec.set('has_registre_beneficiaires', true);

            } else if ( type === 'Infrastructure' ) {
                rec.set('etat_installation', ( age > 2 ) ? 2 : 3);
                rec.set('qualite_travaux', 2);
                rec.set('has_mesures_maintenance', true);
                rec.set('desserte', 1);

            } else if ( type = 'Transport' ) {
                rec.set('etat_vehicule', ( age > 2 ) ? 2 : 3);
                rec.set('has_carnet_bord', false);
                rec.set('has_registre_evacuation', false);
                rec.set('has_police_assurance', true);

                rec.set('has_etudes', null);
            }


            if (has_edifice || type === 'Autre') {
                rec.set('etat_materiels', ( age > 2 ) ? 2 : 3);
                rec.set('utilisation_equipements', 2);
            }

        }
    },


    onRisksLoad: function () {
        this.setRisksLoaded(true);
    },

    onShow: function() {
        var me = this,
            vm = this.getViewModel(),
            record = vm.get('record'),
            
            visitRisks = vm.getStore('visitRisks'),
            recommandations = App.app.getRecommandationsStore(),

            fetchRisks = function() {
                var selections = record.get('risks_list'),
                    treeStore = vm.getStore('riskstree'),
                    rootNode = treeStore.getRootNode(),
                    errorMsg;

                rootNode.cascade(function (node) {
                    var id = node.getId(),
                        itemIdx = selections.indexOf(id),

                        errorMsg;

                    if (itemIdx > -1) {
                        visitRisks.add({
                            'id': node.getId(),
                            'name': node.get('name'),
                            'url': node.get('url')
                        });

                        selections = Ext.Array.removeAt(selections, itemIdx);
                    }

                });

                if (selections.length) {
                    errorMsg = "Les risques portant ces identifiants n'ont pas été retrouvés :<br/> <ol><li>";
                    errorMsg += selections.join('</li><li>');
                    errorMsg += '</ol>';

                    App.ux.Signals.showWarning(errorMsg, true);
                }

            };

        visitRisks.removeAll();
    
        if (record.isPhantom()) {
            recommandations.removeAll();

            var args = location.href.split('/'),
                product_id = args[5];

            if (product_id) {
                record.set('product_id', product_id);
            }

            
            
        } else {
            recommandations.filter('visit_id', record.get('id'));

            if (this.getRisksLoaded()) {
                fetchRisks();
            } else  {
                setTimeout(fetchRisks, 250);
            }

        }

        //vm.getStore('products').reload();

        this.callParent(arguments);
    },

    onRemoveRisk: function (grid, context) {
        var me = this,
            record = context.record;

        if (!record) {
            return;
        }

        var me = this,
			msg = "Continuer la Suppression ?",
			
			handler = function (buttonId) {
				if (buttonId !== "yes") {
					return false;
				}
				
                grid.store.remove(record);
			};
			
		App.ux.Signals.askUserPermission(msg, handler);
    },


    onAddRisk: function () {
        var view = this.getView(),

            myWindow = Ext.create({
                xtype: 'riskswizard',
                ownerCmp: view
            });

        myWindow.show();
    },


    onRisksWizardActivate: function () {
        /*var vm = this.getViewModel(),
            record = vm.get('record'),
            selections = record.get('risks_list'),
            
            tree = this.lookup('risksCheckTree'),
            rootNode = tree.store.getRootNode(),
            risksName = [],
            list;

        rootNode.cascade(function (node) {
            var id = node.getId();

            if (selections.indexOf(id) === -1) {
                node.set('checked', false);
            } else {
                node.set('checked', true);
                risksName.push(node.get('name'));
            }
        });

        list = this.makeList(risksName);

		App.ux.Signals.askUserPermission(list, function (buttonId) {
				if (buttonId !== "yes") {
					return false;
				}
        });*/
    },

    makeList: function (records) {
        var list;

        if (records.length) {
            list = '<h3>Vous avez ajouté les risques suivants :</h3>';
            list += ('<ul><li>' + records.join('</li><li>') + '</li></ul>');

        } else {
            list = "Vous n'avez aucun risque pour le moment";
        }

        return list;
    },

    onRecommandationEdit: function(dataview, location) {
        var record = location.record;

        if (!record) {
            return;
        }

        Ext.create({
            xtype: 'recommandationedit',
            record: record,
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }

        }).show();
    },

    removeRecommandation: function (grid, context) {
        var me = this,
            view = me.getView(),
            record = context.record,

			msg = "Continuer la Suppression ?",

            callback = function() {
                view.unmask();
            },
			
			handler = function (buttonId) {
				if (buttonId !== "yes") {
					return false;
				}
				
				view.mask({
                    xtype: 'loadmask',
                    message: "Suppression ..."
                });

                record.erase({
                    callback: function(result, operation) {
                        App.ux.Signals.CRUDCallback(record, operation, null, callback);
                    }
                });
			};
			
		App.ux.Signals.askUserPermission(msg, handler);
    },


    onCreateRecommandation: function () {
        var me = this,
            newRecord = Ext.create('App.model.Recommandation'),
            vm = me.getViewModel(),
            visit = vm.get('record');

        if (! visit.isPhantom()) {
            newRecord.set('visit_id', visit.getId());
        }

        Ext.create({
            xtype: 'recommandationcreate',
            record: newRecord,
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }

        }).show();
    },

    onCheckChange: function (col, rowIndex, checked, record, e, eOpts ) {
        var tree = this.lookup('risksCheckTree');

        checkPropagate(record, checked);
    },

    finalize: function (result) {
        var me = this,
            vm = me.getViewModel(),
            visit = vm.get('record');

        if (!result) {
            this.callParent(arguments);
            return;
        }

        var visitId = result.getId(),
            recommandations = App.app.getRecommandationsStore(),
            records = [],

            onError = function (err) {
                if (err) {
                    console.log(err);
                }

                App.ux.Signals.showWarning('Echec d\'ajout des recommandations', true);
            };


        if (recommandations.count()) {
            recommandations.each(function (rec) {
                records.push(rec);
            });
    
            // Invoke child until array has elements, no loops are needed here
            _process(records.shift(), visitId).then(function next() {

                if (records.length) {
                    return _process(records.shift(), visitId).then(next, onError);
                }

            }).otherwise(onError);
        }

        this.callParent(arguments);
                    
    },

    onSubmitTap: function() {
        var me = this,
            vm = me.getViewModel(),
            record = vm.get('record'),
            visitRisks = vm.getStore('visitRisks'),
            list = [],
            selections = [],

            startDate = record.get('startDate'),
            endDate = record.get('endDate'),

            productCombo = this.lookup('productCombo'),
            
            product = record.getProduct() || record._product,
            meta;

        if (!endDate || startDate > endDate) {
            record.set('endDate', startDate);
        }

        if (product) {
            meta = product.get('name') + ' ';
            meta += product.get('commune');

        } else {
            meta = productCombo.getSelection().get('label');
        }

        record.set('meta', meta);

        visitRisks.each(function (risk) {
            selections.push(risk.getId());
            list.push(risk.get('name'));
        });
       
        list = this.makeList(list);

        App.ux.Signals.askUserPermission(list, function (buttonId) {
            if (buttonId !== "yes") {
                return false;
            }

            record.set('risks_list', selections);
            //record.set('startDate', record.get('startDate'));

            App.view.visit.WizardController.superclass.onSubmitTap.apply(me);
        });

    },

    finalize: function() {
        this.callParent(arguments);

        this.getView().close();
    }

    
});

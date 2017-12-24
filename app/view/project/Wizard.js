Ext.define('App.view.project.Wizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'projectwizard',
        'projectcreate',
        'projectedit'
    ],

    viewModel: {
        type: 'projectwizard'
    },

    controller: {
        type: 'projectwizard'
    },

    cls: 'projectwizard',


    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} Projet << {record.intitule} >>'
    },

    width: 700,

    screens: [{
        title: 'Localisation administrative',
        iconCls: 'x-fa fa-info',

        items: [{
            xtype: 'textfield', 
            reference: 'reference',
            label: 'Réf SI',
            bind: '{record.reference}'
        }, {
            xtype: 'textfield', 
            reference: 'intitule',
            label: 'Intitulé',
            autoCapitalize: true,
            required: true,
            bind: '{record.intitule}'
        }, {
            xtype: 'spinnerfield',            
            label: 'Exercice',
            required: true,
            bind: '{record.annee}'
        }, {            
            xtype: 'selectfield',
            reference: 'programme',
            label: 'Programme',

            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',
            required: true,
            
            bind: {
                value: '{record.programme}',
                store: '{programmes}'
            }

        }, {
            xtype: 'combobox',
            reference: 'secteur_activite_principal',
            label: 'Secteur d\'activité principal',
            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',
            required: true,
            
            bind: {
                value: '{record.secteur_activite_principal}',
                store: '{secteurs}'
            }
        }, {
            xtype: 'combobox',
            reference: 'secteur_activite',
            label: 'Secteur d\'activité',
            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',
            required: true,
            
            bind: {
                value: '{record.secteur_activite}',
                store: '{soussecteurs}'
            }

        }, {
            xtype: 'checkbox',
            padding: '0 0 0 198',
            reference: 'est_projet',
            boxLabel: 'Projet ?',
            bind: '{record.est_projet}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 198',
            reference: 'est_AGR',
            boxLabel: 'Projet AGR ?',
            bind: '{record.est_AGR}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 198',
            reference: 'est_infrastructure',
            boxLabel: 'Infrastructure ?',
            bind: '{record.est_infrastructure}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 198',
            reference: 'est_EPS',
            boxLabel: 'EPS ?',
            bind: '{record.est_EPS}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 198',
            reference: 'est_PCD',
            boxLabel: 'Rélève de PCD ?',
            bind: '{record.est_PCD}'
        }, {
            xtype: 'combobox',
            label: 'Produit concerné',
            displayField: 'label',
            valueField: 'value',
            queryMode: 'local',
            
            bind: {
                value: '{record.product_id}',
                store: '{products}'
            }
        }, {
            xtype: 'textareafield',
            reference: 'consistance',
            label: 'Consistance',
            bind: '{record.objectifs}',
        }, {
            xtype: 'filefield',
            reference: 'convBrowser',
            label: 'Convention',
            name: 'convention',
            bind: '{record.convention}',
        }]
    }, {
        title: 'Porteur du projet',
        iconCls: 'x-fa fa-info',
        items: [{
            xtype: 'combobox',
            reference: 'porteur',
            label: 'Dénomination du Porteur',
            displayField: 'label',
            valueField: 'value',
            queryMode: 'local',
            required: true,
            
            bind: {
                value: '{record.porteur_ajuste}',
                store: '{partners}'
            }
        }]
    }, {
        title: 'Montage Financier',
        iconCls: 'x-fa fa-money',
        items: [{
            xtype: 'spinnerfield',
            reference: 'montant_global',
            label: 'Montant global',
            bind: '{record.montant_global}',
            
            clearable: true,
            stepValue: 10000,
            cycle: true
        }, {
            xtype: 'spinnerfield',
            reference: 'part_INDH',
            label: 'Part INDH',
            bind: '{record.part_INDH}',
            
            clearable: true,
            stepValue: 10000,
            cycle: true
        }, {
            xtype: 'spinnerfield',
            reference: 'montant_engage',
            label: 'Montant engagé',
            bind: '{record.montant_engage}',
            
            clearable: true,
            stepValue: 10000,
            cycle: true
        }, {
            xtype: 'spinnerfield',
            reference: 'montant_emis',
            label: 'Montant émis',
            bind: '{record.montant_emis}',
            
            clearable: true,
            stepValue: 10000,
            cycle: true
        }]
    }, {
        title: 'Localisation',
        iconCls: 'x-fa fa-map',
        items: [{
            xtype: 'container',
            autoSize: true,
            items: [{
                xtype: 'numberfield',
                reference: 'latitude',
                label: 'Latitude',
                bind: '{record.location.latitude}'
            }, {
                xtype: 'numberfield',
                reference: 'longitude',
                label: 'Longitude',
                bind: '{record.location.longitude}'
            }]
        }, {
            xtype: 'textfield',
            reference: 'address',
            label: 'Addresse',
            bind: '{record.address}'
        }, {
            xtype: 'combobox',
            reference: 'quartier_douar',
            label: 'Quartier/Douar',
            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',
            required: true,
            
            bind: {
                value: '{record.quartier_douar}',
                store: '{quartiers}'
            }
        }, {
            xtype: 'combobox',
            reference: 'commune',
            label: 'Commune',
            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',
            required: true,
            
            bind: {
                value: '{record.commune}',
                store: '{communes}'
            }
        }]
    }, {
        title: 'Bénéficiaires',
        iconCls: 'x-fa fa-users',
        items: [{
            xtype: 'spinnerfield',
            reference: 'capacite_accueil',
            label: 'Capacite d\'accueil',
            bind: '{record.capacite_accueil}',
            
            clearable: true,
            stepValue: 1,
            cycle: true
        }, {
            xtype: 'spinnerfield',
            reference: 'pop_benef_totale',
            label: 'Population totale',
            bind: '{record.pop_benef_totale}',
            
            clearable: true,
            stepValue: 1,
            cycle: true
        }, {
            xtype: 'container',
            autoSize: true,
            items: [{
                xtype: 'spinnerfield',
                reference: 'pop_benef_homme',
                label: 'Hommes',
                bind: '{record.pop_benef_homme}',
                
                clearable: true,
                stepValue: 1,
                cycle: true
            }, {
                xtype: 'spinnerfield',
                reference: 'pop_benef_femme',
                label: 'Femmes',
                bind: '{record.pop_benef_femme}',
                
                clearable: true,
                stepValue: 1,
                cycle: true
            }, {
                xtype: 'spinnerfield',
                reference: 'pop_benef_jeune',
                label: 'Jeunes',
                bind: '{record.pop_benef_jeune}',
                
                clearable: true,
                stepValue: 1,
                cycle: true
            }, {
                xtype: 'spinnerfield',
                reference: 'pop_benef_menage',
                label: 'Ménages',
                bind: '{record.pop_benef_menage}',
                
                clearable: true,
                stepValue: 1,
                cycle: true
            }]
        }]
    }, {
        title: 'Suivi',
        iconCls: 'x-fa fa-eye',
        items: [{
            xtype: 'selectfield',
            reference: 'statut',
            label: 'Statut actuel',
            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',
            required: true,
            
            bind: {
                value: '{record.statut}',
                store: '{statuts}'
            }
        }, {
            xtype: 'textfield',
            reference: 'etat_physique_actuel',
            label: 'Etat physique actuel',
            bind: '{record.etat_physique_actuel}'         
        }, {
            xtype: 'spinnerfield',
            label: '% Avancement physique',
            bind: '{record.tx_avancement_physique}',
            minValue: 0,
            maxValue: 100,
            stepValue: 1
        }, {
            xtype: 'datepickerfield',
            reference: 'date_lancement',
            label: 'Date de lancement',
            dateFormat: 'd/m/Y',
            bind: '{record.date_lancement}'
        }, {
            xtype: 'datepickerfield',
            reference: 'date_execution',
            label: 'Date d\'exécution',
            dateFormat: 'd/m/Y',
            bind: '{record.date_execution}'
        }, {
            xtype: 'spinnerfield',
            label: 'Délai d\'exécution prévu (mois)',
            bind: '{record.duree_projet}',
            minValue: 0,
            stepValue: 1
        }, {
            xtype: 'datepickerfield',
            reference: 'date_achevement',
            label: 'Date d\'achèvement',
            dateFormat: 'd/m/Y',
            bind: '{record.date_achevement_probable}'
        }, {
            xtype: 'datepickerfield',
            reference: 'date_emission',
            label: 'Date d\'émission',
            dateFormat: 'd/m/Y',
            bind: '{record.date_emission}'
        }]
    }, {
        title: 'Souffrance',
        iconCls: 'x-fa fa-exclamation-triangle',

        bind: {
            disabled: '{record.en_souffrance}'
        },

        items: [{
            xtype: 'combobox',
            reference: 'motif_souffrance',
            label: 'Motif de souffrance',

            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',
            
            bind: {
                value: '{record.motif_souffrance}',
                store: '{motifs}'
            }
                 
        }, {
            xtype: 'textareafield',
            reference: 'mesures_relance',
            label: 'Mesures de relance',
            bind: '{record.mesures_relance}',
        }, {
            xtype: 'textfield', 
            reference: 'responsable_relance',
            label: 'Responsable de la mise en œuvre',
            bind: '{record.responsable_relance}'
        }, {
            xtype: 'textareafield',
            reference: 'planning_relance',
            label: 'Planning de réalisation',
            bind: '{record.planning_relance}',
        }]
    }, {
        title: 'Images',
        iconCls: 'x-fa fa-picture-o',

        items: [{
            xtype: 'filefield',
            reference: 'picBrowser',
            label: 'Ajouter une photo',
            //name: 'picture',
            accept: 'image',

            listeners: {
                change: 'onAddPicture'
            }

        }, {
            xtype: 'dataview',
            bind: '{images}',
            ui: 'thumbnails',
            minHeight: 200,
            inline: true,
            itemTpl: '<div class="thumbnail" style="margin: 10px; background-image: url(/uploads/{src}), url(images/broken_image.gif)"></div>',
            listeners: {
                childtap: 'onPictureTap'
            }
        }]
    
    }, {
        title: 'Commentaires',
        iconCls: 'x-fa fa-commenting-o',

        layout: 'fit',
        
        items: [{
            xtype: 'textareafield',
            reference: 'comment',
            label: 'Commentaire',
            bind: '{record.comment}'         
        }]
    }]
});
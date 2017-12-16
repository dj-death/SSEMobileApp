Ext.define('App.view.product.Wizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'productwizard',
        'productcreate',
        'productedit'
    ],

    viewModel: {
        type: 'productwizard'
    },

    controller: {
        type: 'productwizard'
    },

    cls: 'productwizard',

    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} Produit  << {record.name} >>'
    },

    width: 600,

    listeners: {
        show: 'onRefreshView'
    },

    screens: [{
        title: 'Général',
        iconCls: 'x-fa fa-info',
        items: [{
            xtype: 'textfield',
            reference: 'value',
            label: 'Dénomination',
            autoCapitalize: true,
            required: true,
            bind: '{record.name}'
        }, {
            xtype: 'datepickerfield',
            reference: 'date_creation',
            label: 'Date d\'opérationnalisation',
            dateFormat: 'd/m/Y',
            bind: '{record.date_creation}'
        }, {
            xtype: 'selectfield',
            reference: 'type',
            label: 'Type',

            options: [{
                text: 'AGR',
                value: 'AGR'
            }, {
                text: 'EPS / Centre d\'accueil',
                value: 'EPS'
            }, {
                text: 'Centre (CSE, Maisons des jeunes, Foyers,.etc)',
                value: 'Centre'
            }, {
                text: 'Moyens de transports',
                value: 'Transport'
            }, {
                text: 'Service public social',
                value: 'Service public social'
            }, {
                text: 'Infrastructure / Espace aménagé',
                value: 'Infrastructure'
            }, {
                text: 'Espace de sport',
                value: 'Espace de sport'
            }, {
                text: 'Autre',
                value: 'Autre'
            }],

            required: true,
            bind: '{record.type}'
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
            xtype: 'selectfield',
            reference: 'type_agr',
            label: 'Type d\'AGR',
            options: [
                '',
                'AGR structurante',
                'AGR émergente',
                'AGR de subsistance'
            ],

            bind: {
                hidden: '{record.besoin_gestion}',
                value: '{record.type_AGR}'
            }
        }, {
            xtype: 'textareafield',
            reference: 'consistance',
            label: 'Consistance',
            bind: '{record.consistance}',
        }, {
            xtype: 'selectfield',
            reference: 'statut',
            label: 'Statut actuel',

            options: [
                'Annulé',
                'Non démarré',
                'En cours d\'étude',
                'En cours de lancement',
                'En cours d\'exécution',
                'Achevé (considéré non opérationnel)',
                'Opérationnel',
                'En difficulté',
                'En arrêt',
                'En cours de résiliation',
                'Résilié'
            ],

            required: true,
            bind: '{record.statut}'
        }, {
            xtype: 'selectfield',
            reference: 'niveau_perennite',
            label: 'Niveau pérennité',

            options: [
                '',
                'Pérennité assurée',
                'Pérennité menacée',
                'Pérennité très menacée'
            ],

            bind: '{record.niveau_perennite}'
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
        }, {
            xtype: 'emailfield',
            reference: 'email',
            label: 'E-mail',
            bind: '{record.email}'
        }, {
            xtype: 'textfield',
            reference: 'phone',
            label: 'Téléphone',
            bind: '{record.phone}'
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
            stepValue: 1
        }, {
            xtype: 'container',
            autoSize: true,
            items: [{
                xtype: 'spinnerfield',
                reference: 'pop_benef_homme',
                label: 'Hommes',
                bind: '{record.pop_benef_homme}',
                
                clearable: true,
                stepValue: 1
            }, {
                xtype: 'spinnerfield',
                reference: 'pop_benef_femme',
                label: 'Femmes',
                bind: '{record.pop_benef_femme}',
                
                clearable: true,
                stepValue: 1
            }, {
                xtype: 'spinnerfield',
                reference: 'pop_benef_jeune',
                label: 'Jeunes',
                bind: '{record.pop_benef_jeune}',
                
                clearable: true,
                stepValue: 1
            }, {
                xtype: 'spinnerfield',
                reference: 'pop_benef_menage',
                label: 'Ménages',
                bind: '{record.pop_benef_menage}',
                
                clearable: true,
                stepValue: 1
            }]
        }]
    }, {
        title: 'Gestion',
        iconCls: 'x-fa fa-briefcase',

        bind: {
            disabled: '{!record.besoin_gestion}'
        },

        items: [{
            xtype: 'selectfield',
            reference: 'mode_gestion',
            label: 'Mode de gestion',

            options: [
                'Association gestionnaire',
                'Collectivité locale',
                'Service extérieur',
                'Gestion déléguée',
                'SIGMA',
                'Autre',
                'Sans',
                'N/A'
            ],

            bind: '{record.mode_gestion}'
        }, {
            xtype: 'textfield',
            reference: 'director',
            label: 'Directeur',
            bind: '{record.director}'
        }, {
            xtype: 'combobox',
            label: 'Gestionnaire',
            displayField: 'label',
            valueField: 'value',
            queryMode: 'local',
            bind: {
                value: '{record.partner_id}',
                store: '{managements}'
            }
        }, {
            xtype: 'spinnerfield',
            reference: 'staff',
            label: 'Staff / Encadrement',
            bind: '{record.staff}',
            
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'selectfield',
            reference: 'activite1_gestionnaire',
            label: '1ère Activité du gestionnaire',
            options: [
                '',
                'Gestion intégrée',
                'Assistance / Encadrement',
                'Formation et qualification professionnelle',
                'Financement et logistiques'
            ],

            bind: '{record.activite1_gestionnaire}'
        }, {
            xtype: 'selectfield',
            reference: 'activite2_gestionnaire',
            label: '2ème Activité du gestionnaire',
            options: [
                '',
                'Gestion intégrée',
                'Assistance / Encadrement',
                'Formation et qualification professionnelle',
                'Financement et logistiques'
            ],

            bind: '{record.activite2_gestionnaire}'
        }, {
            xtype: 'selectfield',
            reference: 'activite3_gestionnaire',
            label: '3ème Activité du gestionnaire',
            options: [
                '',
                'Gestion intégrée',
                'Assistance / Encadrement',
                'Formation et qualification professionnelle',
                'Financement et logistiques'
            ],

            bind: '{record.activite3_gestionnaire}'
        }, {
            xtype: 'spinnerfield',
            reference: 'tarif_moyen',
            label: 'Tarif moyen',
            bind: '{record.tarif_moyen}',
            
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'textareafield',
            reference: 'tarifs_comment',
            label: 'Eclairages / Tarifs',
            bind: '{record.tarifs_comment}',
        }]
    }, {
        title: 'Images',
        iconCls: 'x-fa fa-picture-o',

        items: [{
            xtype: 'filefield',
            reference: 'picBrowser',
            label: 'Ajouter une photo',
            name: 'picture',
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
    
    },  {
        title: 'Données financières',
        iconCls: 'x-fa fa-info',

        defaults: {
            labelAlign: 'left'
        },

        layout: 'fit',
        
        items: [{
            xtype: 'productfinancials'         
        }]
    }, {
        title: 'Indicateurs',
        iconCls: 'x-fa fa-tachometer',

        layout: 'fit',
        
        items: [{
            xtype: 'kpilist'         
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

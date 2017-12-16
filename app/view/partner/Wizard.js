Ext.define('App.view.partner.Wizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'partnerwizard',
        'partnercreate',
        'partneredit'
    ],

    controller: {
        type: 'partnerwizard'
    },

    viewModel: {
        type: 'partnerwizard'
    },

    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} Partenaire  << {record.name} >>'
    },

    width: 900,


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
            xtype: 'textfield',
            reference: 'code',
            label: 'Code DAI / N° Registre des Coop./Commerce',
            bind: '{record.code}'
        }, {
            xtype: 'datepickerfield',
            reference: 'date_creation',
            label: 'Date de création',
            dateFormat: 'd/m/Y',
            bind: '{record.date_creation}'
        }, {
            xtype: 'selectfield',
            reference: 'statut_juridique',
            label: 'Statut juridique',

            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',

            required: true,
            
            bind: {
                value: '{record.statut_juridique}',
                store: '{statutsjuridiques}'
            }

        }, {
            xtype: 'checkbox',
            reference: 'est_RUP',
            boxLabel: "Reconnue d'utilité publique ?",
            bind: '{record.est_rup}'
        }, {
            xtype: 'combobox',
            reference: 'domaine',
            label: 'Domaine d\'activité',

            displayField: 'value',
            valueField: 'value',
            queryMode: 'local',
            
            bind: {
                value: '{record.domaine}',
                store: '{domaines}'
            }
                 
        }]
    }, {
        title: 'Membres',
        iconCls: 'x-fa fa-users',
        items: [{
            xtype: 'textfield',
            reference: 'president',
            label: 'Président',
            bind: '{record.president}'
        }, {
            xtype: 'spinnerfield',
            reference: 'effectif',
            label: 'Nombre des membres du Bureau/Associés',
            bind: '{record.effectif}',
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'selectfield',
            reference: 'parite',
            label: 'Parité',

            options: [
                '',
                'Majoritairement masculine',
                'Majoritairement féminine',
                'Majoritairement jeunes',
                'Paritaire H-F',
                'Paritaire H-F-J',
                'Paritaire F-J'
            ],

            bind: '{record.parite}'
        }, {
            xtype: 'filefield',
            reference: 'membres',
            label: 'Liste des membres',
            name: 'membres',
            accept: 'image',
            bind: '{record.liste_membres}'
        }, {
            xtype: 'members'         
        }]
        
    }, {
        title: 'Localisation',
        iconCls: 'x-fa fa-map',
        items: [{
            xtype: 'selectfield',
            reference: 'niveau_intervention',
            label: 'Niveau d\'intervention',

            options: [
                '',
                'Local',
                'Régional',
                'National'
            ],

            bind: '{record.niveau_intervention}'
        }, {
            xtype: 'selectfield',
            reference: 'champ_intervention',
            label: 'Champ d\'intervention',

            options: [
                '',
                'Rural',
                'Urbain',
                'Périurbain'
            ],

            bind: '{record.champ_intervention}'
        }, {
            xtype: 'textfield',
            reference: 'address',
            label: 'Addresse',
            bind: '{record.address}'
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
            xtype: 'urlfield',
            reference: 'website',
            label: 'Site Web',
            placeholder: 'http://',
            clearable: true,
            bind: '{record.website}'
        }, {
            xtype: 'textfield',
            reference: 'phone',
            label: 'Téléphone',
            bind: '{record.phone}'
        }]
    }, {
        title: 'Cadre règlementaire et gouvernance',
        iconCls: 'x-fa fa-university',

        items: [{
            xtype: 'checkbox',
            padding: '0 0 0 80',
            reference: 'has_dossier_reglementaire',
            boxLabel: 'Dossier règlementaire conforme ?',
            bind: '{record.has_dossier_reglementaire}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 80',
            reference: 'does_respect_tenue_AG',
            boxLabel: 'Respect tenue assemblées A.G ?',
            bind: '{record.does_respect_tenue_AG}'
        }, {
            xtype: 'datepickerfield',
            reference: 'date_derniere_AG',
            label: 'Date dernière A.G',
            dateFormat: 'd/m/Y',
            width: 400,
            bind: '{record.date_derniere_AG}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 80',
            reference: 'has_rapports',
            boxLabel: 'Elaboration des rapports annuels et PVs ?',
            bind: '{record.has_rapports}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 80',
            reference: 'has_elaboration_bilan',
            boxLabel: 'Elaboration bilans ?',
            bind: '{record.has_elaboration_bilan}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 80',
            reference: 'has_certification_comptes',
            boxLabel: 'Certification Comptes ?',
            bind: '{record.has_certification_comptes}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 80',
            reference: 'has_qualite_systeme_gestion',
            boxLabel: 'Qualité du système de G.F.C ?',
            bind: '{record.has_qualite_systeme_gestion}'
        }]
    }, {
        title: 'Moyens',
        iconCls: 'x-fa fa-money',
        items: [{
            xtype: 'selectfield',
            reference: 'type_siege',
            label: 'Siège de l\'entité',

            options: [
                '',
                'Propriété',
                'Location',
                'Mise à disposition',
                'Sans'
            ],

            bind: '{record.type_siege}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 80',
            reference: 'has_disponibilite_moyens',
            boxLabel: 'Disponibilité des moyens nécessaires ?',
            bind: '{record.has_disponibilite_moyens}'
        }, {
            xtype: 'checkbox',
            padding: '0 0 0 80',
            reference: 'has_accompagnement_formation',
            boxLabel: 'a bénéficié d\'accompagnement et formations ?',
            bind: '{record.has_accompagnement_formation}'
        }]
    }, {
        title: 'Données financières',
        iconCls: 'x-fa fa-info',

        defaults: {
            labelAlign: 'left'
        },

        layout: 'fit',
        
        items: [{
            xtype: 'financials'    
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
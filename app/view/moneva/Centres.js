Ext.define('App.view.moneva.Centres', {
    extend: 'Ext.Panel',
    xtype: 'centreschecklist',

    requires: [
        'Ext.panel.Collapser'
    ],

    collapsible: {
        direction: 'top',
        dynamic: true
    },

    defaults: {
        labelAlign: 'top',
        labelTextAlign: 'left'
    },

    items: [{
        xtype: 'selectfield',
        label: 'Type du Centre',

        options: [
            '',
            'Centre de personnes âgées',
            'Centre pour Personnes Handicapées',
            'Dar Attalib/a',
            'Orphelinat',
            'Foyer Féminin',
            'Centre Socio-éducatif',
            'Centre d’Ecoute et d’Orientation',
            'Autre'
        ],

        bind: '{record.type_centre}'
    }, {
        
        label: 'Etat du Bâtiment',

        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_batiment}',
            store: '{etats}'
        }

    }, {
        label: "Etat de l’étanchéité et des revêtement",

        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_etancheite}',
            store: '{etats}'
        }

    }, {
        label: "Etat de la Plomberie–Sanitaires et Assainissement",

        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_plomberie}',
            store: '{etats}'
        }

    }, {
        label: "Etat des équipements",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_equipements}',
            store: '{etats}'
        }
    }, {
        label: "Qualité d’Hygiène",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.qualite_hygiene}',
            store: '{satisfactions}'
        }
    }, {
        label: "Sécurité du centre et des bénéficiaires",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.securite_centre}',
            store: '{satisfactions}'
        }

    }, {
        xtype: 'spinnerfield',
        label: "Effectif d'encadrement",
        bind: '{record.effectif_encadrement}',
        
        clearable: true,
        stepValue: 1,
        cycle: true
    }, {
        label: "Suffisance d'encadrement",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_personnel_encadrement}',
            store: '{suffisances}'
        }

    }, {
        label: "Ressources financière de fonctionnement",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.ressources_financieres}',
            store: '{suffisances}'
        }
    }, {
        xtype: 'spinnerfield',
        label: 'Nbre Capacite d\'accueil',
        bind: '{record.capacite_accueil}',
        
        clearable: true,
        stepValue: 1,
        cycle: true
    }, {
        label: "Capacité d’accueil",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_capacite_accueil}',
            store: '{satisfactions}'
        }
        
    }, {
        label: 'Raccordement eau',
        labelAlign: 'left',
        xtype: 'checkbox',
        padding: '0 0 0 80',
        bind: '{record.has_eau}'
    }, {
        label: 'Raccordement électricité',
        labelAlign: 'left',
        xtype: 'checkbox',
        padding: '0 0 0 80',
        bind: '{record.has_electricite}'
    }, {
        label: 'Raccordement assainissement',
        labelAlign: 'left',
        xtype: 'checkbox',
        padding: '0 0 0 80',
        bind: '{record.has_assainissement}'
    }, {
        label: 'Accessibilité',
        labelAlign: 'left',
        xtype: 'checkbox',
        padding: '0 0 0 80',
        bind: '{record.has_accessibilite}'
    }, {
        label: 'Existence du registre de bénéficiaires',
        labelAlign: 'left',
        xtype: 'checkbox',
        padding: '0 0 0 80',
        bind: '{record.has_registre_beneficiaires}'
    }, {
        label: 'Existence d’espaces de repos/jeux',
        labelAlign: 'left',
        xtype: 'checkbox',
        padding: '0 0 0 80',
        bind: '{record.has_espaces_repos}'
    }]

});
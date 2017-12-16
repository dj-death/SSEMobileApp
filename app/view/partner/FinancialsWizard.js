Ext.define('App.view.partner.FinancialsWizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'financialswizard',
        'financialscreate',
        'financialsedit'
    ],

    controller: {
        type: 'financialswizard'
    },

    /*viewModel: {
        type: 'recommandationwizard'
    },*/


    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} Etat financier exercice << {record.exercice} >>'
    },

    width: 600,

    screens: [{
        title: 'Général',

        items: [{
            xtype: 'selectfield',
            label: 'Exercice',
            options: [
                2009,
                2010,
                2011,
                2012,
                2013,
                2014,
                2015,
                2016,
                2017,
                2018,
                2019,
                2020,
                2021
            ],
            required: true,
            bind: '{record.exercice}'

        }, {
            xtype: 'spinnerfield',
            label: 'CA prévu',
            bind: '{record.CA_prevu}',

            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'CA réel',
            bind: '{record.CA_reel}',

            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Résultat net prévu',
            bind: '{record.resultat_net_prevu}',

            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Résultat net réel',
            bind: '{record.resultat_net_reel}',

            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }]
    }, {
        title: 'Actif',

        items: [{
            xtype: 'spinnerfield',
            label: 'Immobilisations',
            bind: '{record.immobilisations}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Créances',
            bind: '{record.creances}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Stocks',
            bind: '{record.stocks}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Trésorerie',
            bind: '{record.tresorerie}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }]
    }, {
        title: 'Passif',
        
        items: [{
            xtype: 'spinnerfield',
            label: 'Capitaux propres',
            bind: '{record.capitaux_propres}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Dettes MLT',
            bind: '{record.dettes_MLT}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Dettes CT',
            bind: '{record.dettes_CT}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }]
    }, {
        title: 'Produits & Charges',
        
        items: [{
            xtype: 'spinnerfield',
            label: 'BFR',
            bind: '{record.BFR}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Recettes',
            bind: '{record.total_recettes}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Dépenses',
            bind: '{record.total_depenses}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Solde',
            bind: '{record.solde}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Frais personnel',
            bind: '{record.frais_personnel}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Subventions',
            bind: '{record.total_subventions}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Loyer',
            bind: '{record.loyer}',
            
            clearable: true,
            stepValue: 1,
            decimals: 2
        }]
    }]
});
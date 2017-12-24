Ext.define('App.view.moneva.AGR', {
    extend: 'Ext.Panel',
    xtype: 'agrchecklist',

    requires: [
        'Ext.panel.Collapser'
    ],

    collapsible: {
        direction: 'top',
        dynamic: true
    },

    

    defaults: {
        xtype: 'checkbox',
        labelAlign: 'left',
        labelTextAlign: 'left',
        padding: '0 0 0 80'
    },

    

    items: [{
        xtype: 'textfield',
        label: 'Filière',
        bind: '{record.filiere}'         
    }, {
        xtype: 'spinnerfield',
        label: "Nombre d’année d’existence",
        bind: '{record.age}',        
        stepValue: 1
    }, {
        boxLabel: "Viabilité de l’AGR",
        bind: '{record.est_viable}'
    }, {
        boxLabel: "Dégagement de revenu",
        bind: '{record.has_revenus}'
    }, {
        boxLabel: "Maintien des bénéficiaires initiaux",
        bind: '{record.has_maintien_benefs_initiaux}'
    }, {
        xtype: 'spinnerfield',
        label: "Chiffre d’affaires Réalisé",
        bind: '{record.CA_reel}',        
        stepValue: 1
    }, {
        xtype: 'spinnerfield',
        label: "Chiffre d’affaires Prévu",
        bind: '{record.CA_prevu}',        
        stepValue: 1
    }, {
        xtype: 'combobox',
        label: "Explication de la différence",

        padding: 0,

        options: [
            '',
            "Prévisions de ventes trop ambitieuses",
            "Clients en difficultés",
            "Problèmes de qualité du produit",
            "Concurrence trop rude",
            "Autres"
        ],

        bind: '{record.explication_ecart_CA}'
    }, {
        xtype: 'combobox',
        label: "Types de difficultés rencontrées dans cette AGR",

        padding: 0,

        options: [
            '',
            "Difficultés financières / de trésorerie",           
            "Problèmes d’organisation",                             
            "Maladie",
            "Problèmes de commercialisation",           
            "Problème de ressources humaines qualifiées",
            "Problèmes d’approvisionnement",
            "Problème avec les associés",
            "Aléas climatiques",
            "Autre"
        ],

        bind: '{record.difficultes_rencontrees}'
    }]

});
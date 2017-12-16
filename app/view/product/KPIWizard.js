Ext.define('App.view.product.KPIWizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'kpiwizard',
        'kpicreate',
        'kpiedit'
    ],

    controller: {
        type: 'kpiwizard'
    },


    bind: {
        title: '{record.phantom? "Ajouter" : "Modifier"} KPI exercice << {record.exercice} >>'
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
            xtype: 'textfield',
            label: 'Intitulé',
            required: true,
            bind: '{record.name}'
        }, {
            xtype: 'spinnerfield',
            label: 'Valeur',
            bind: '{record.value}',
            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'spinnerfield',
            label: 'Valeur cible',
            bind: '{record.target}',

            clearable: true,
            stepValue: 1,
            decimals: 2
        }, {
            xtype: 'textfield',
            label: 'Source',
            bind: '{record.source}'
        }, {
            xtype: 'textareafield',
            label: 'Commentaires',
            bind: '{record.comment}'
        }]
    }]
});
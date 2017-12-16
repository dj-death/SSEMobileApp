Ext.define('App.view.mission.Wizard', {
    extend: 'App.view.widgets.Wizard',
    xtype: [
        'missionwizard',
        'missioncreate',
        'missionedit'
    ],

    bind: {
        title: '{record.phantom? "Ajouter" : "Editer"} Mission'
    },

    width: 600,

    screens: [{
        title: 'General',
        iconCls: 'x-fa fa-info',
        items: [{
            xtype: 'textfield',
            reference: 'name',
            label: 'Intitulé',
            required: true,
            bind: '{record.name}'
        }, {

            xtype: 'selectfield',
            label: 'Motif',
            options: [{
                text: 'Programmé',
                value: 'programmé'
            }, {
                text: 'Autre',
                value: 'autre'
            }],

            required: true,
            bind: '{record.motive}'

        }, {
            xtype: 'datepickerfield',
            reference: 'start_date',
            label: 'Début',
            dateFormat: 'd/m/Y',
            required: true,
            bind: '{record.start_date}'
        }, {
            xtype: 'datepickerfield',
            reference: 'end_date',
            dateFormat: 'd/m/Y',
            label: 'Fin',
            required: true,
            bind: '{record.end_date}'
        }]
    }]
});

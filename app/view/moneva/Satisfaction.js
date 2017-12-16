Ext.define('App.view.moneva.Satisfaction', {
    extend: 'Ext.Container',
    xtype: 'satisfactionchecklist',

    defaults: {
        labelAlign : 'left',
        labelTextAlign: 'left'
    },

    items: [{
        label: "Satisfait ?",
        xtype: 'checkbox',
        labelAlign: 'left',
        padding: '0 0 0 80',
        bind: '{record.est_satisfait}'
    }, {
        label: 'Degrés',
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.degre_satisfaction}',
            store: '{degrees}'
        }
    }]

    
});
Ext.define('App.view.moneva.Prestation', {
    extend: 'Ext.Container',
    xtype: 'prestationchecklist',

    defaults: {
        labelAlign : 'left',
        labelTextAlign: 'left'
    },

    items: [{
        label: 'Qualité des prestations',
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.qualite_prestations}',
            store: '{satisfactions}'
        }
        
    }, {
        label: 'Tarification',
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        options: [
            { value: 0, label: 'Gratuits' },
            { value: 1, label: 'Payants' }
        ],

        bind: '{record.tarification}'
        
    }, {
        xtype: 'spinnerfield',
        label: 'Tarif',
        bind: '{record.tarif}',
        
        clearable: true,
        stepValue: 1
    }, {
        xtype: 'textareafield',
        label: 'Eclairages / Tarifs',
        bind: '{record.comment_tarif}',
    }, {
        xtype: 'spinnerfield',
        label: 'Taux d’utilisation',
        bind: '{record.taux_utilisation}',
        minValue: 0,
        maxValue: 100,
        stepValue: 1
    }]

    
});
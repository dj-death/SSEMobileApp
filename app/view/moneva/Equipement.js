Ext.define('App.view.moneva.Equipement', {
    extend: 'Ext.Panel',
    xtype: 'equipementchecklist',

    requires: [
        'Ext.panel.Collapser'
    ],

    collapsible: {
        direction: 'top',
        dynamic: true
    },

    defaults: {
        labelAlign: 'left',
        labelTextAlign: 'left'
    },

    items: [{
        label: 'Etat de matériels',
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_materiels}',
            store: '{objetsetats}'
        }

    }, {
        label: 'Utilisation',
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.utilisation_equipements}',
            store: '{usages}'
        }
    }]

    
});
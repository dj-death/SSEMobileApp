Ext.define('App.view.moneva.Infrastructures', {
    extend: 'Ext.Panel',
    xtype: 'infrastructureschecklist',

    requires: [
        'Ext.panel.Collapser'
    ],

    collapsible: {
        direction: 'top',
        dynamic: true
    },

    defaults: {
        labelTextAlign: 'left'
    },


    items: [{
        label: "Etat de l’installation",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.etat_installation}',
            store: '{qualites}'
        }

    }, {
        label: "Qualité des travaux",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.qualite_travaux}',
            store: '{etats}'
        }

    }, {        
        label: "Existence des mesures de maintenance",
        xtype: 'checkbox',
        labelAlign: 'left',
        padding: '0 0 0 80',
        bind: '{record.has_mesures_maintenance}'
    }, {
        label: "Desserte/Couverture",
        xtype: 'combobox',
        displayField: 'label',
        valueField: 'value',
        queryMode: 'local',
        
        
        bind: {
            value: '{record.desserte}',
            store: '{satisfactions}'
        }
        
    }, {
        label: "Existance des études",
        xtype: 'checkbox',
        labelAlign: 'left',
        padding: '0 0 0 80',
        bind: '{record.has_etudes}'
    }]

});
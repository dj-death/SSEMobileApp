Ext.define('App.view.moneva.Emplois', {
    extend: 'Ext.Panel',
    xtype: 'emploischecklist',

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
        xtype: 'fieldset',
        title: 'Emplois Permanents',

        items: [{
            xtype: 'spinnerfield',
            label: 'Total',
            bind: '{record.emplois_permanents_total}',
            
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'spinnerfield',
            label: 'Hommes',
            bind: '{record.emplois_permanents_homme}',
            
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'spinnerfield',
            label: 'Femmes',
            bind: '{record.emplois_permanents_femme}',
            
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'spinnerfield',
            label: 'Jeunes',
            bind: '{record.emplois_permanents_jeune}',
            
            clearable: true,
            stepValue: 1
        }]
        
    }, {
        
        xtype: 'fieldset',
        title: 'Emplois Occasionnels',

        items: [{
            xtype: 'spinnerfield',
            label: 'Total',
            bind: '{record.emplois_occasionnels_total}',
            
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'spinnerfield',
            label: 'Hommes',
            bind: '{record.emplois_occasionnels_homme}',
            
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'spinnerfield',
            label: 'Femmes',
            bind: '{record.emplois_occasionnels_femme}',
            
            clearable: true,
            stepValue: 1
        }, {
            xtype: 'spinnerfield',
            label: 'Jeunes',
            bind: '{record.emplois_occasionnels_jeune}',
            
            clearable: true,
            stepValue: 1
        }]
        
    }]

    

});
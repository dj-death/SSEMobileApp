Ext.define('App.view.moneva.Problemes', {
    extend: 'Ext.Panel',
    xtype: 'problemeschecklist',

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
        xtype: 'textareafield',
        label: 'problemes projet',
        bind: '{record.problemes_projet}'
    }, {
        xtype: 'textareafield',
        label: 'problemes porteur',
        bind: '{record.problemes_porteur}'
    }]

    
});
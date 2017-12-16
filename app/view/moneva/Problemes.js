Ext.define('App.view.moneva.Problemes', {
    extend: 'Ext.Container',
    xtype: 'problemeschecklist',

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
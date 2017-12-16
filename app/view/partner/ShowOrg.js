Ext.define('App.view.partner.ShowOrg', {
    extend: 'Ext.Panel',
    xtype: 'partnershoworg',

    cls: 'partner-org',
    iconCls: 'x-fa fa-sitemap',

    bind: {
        title:
            '<div class="title">Membres du Bureau</div>'+
            '<div class="caption">effectif : {record.effectif}</div>'
    },


    header: {
        items: [{
            xtype: 'button',
            iconCls: 'x-fa fa-arrows-alt',
            handler: 'showFullscreen',
            ui: 'block',
            weigth: 10,
            tooltip: 'Aggrandir l\'image'
        }]
    },

    layout: 'vbox',

    items: [{
        xtype: 'image',
        minHeight: 300,
        flex: 1,
        width: '100%',
        bind: {
            hidden: '{!record.liste_membres}',
            src: '/uploads/{record.liste_membres}'
        }
    }, {
        xtype: 'members',
        bind: '{members}',
        titleBar: null,
        minHeight: 200,
        flex: 1
    }]
});

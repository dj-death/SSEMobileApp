Ext.define('App.view.product.ShowVisits', {
    extend: 'Ext.Panel',
    xtype: 'productshowvisits',

    iconCls: 'x-fa fa-eye',
    title: 'Visites',
    
    header: {
        items: [{
            xtype: 'button',
            handler: 'onVisitsCountTap',
            iconCls: 'x-fa fa-eye',
            ui: 'block',
            weigth: 10,
            bind: {
                text: '{record.visitscount}',
                tooltip: 'Afficher les visites relatifs à <b>{record.name}</b>.'
            }
        }]
    },

    items: [{
        xtype: 'list',
        bind: '{visits}',
        //ui: 'thumbnails',
        cls: 'office-details',
        minHeight: 80,

        itemTpl: '{startDate:date("d F Y")} (Il y a {startDate:dateDiff(new Date())})',
        grouped: true,
        pinHeaders: true,

        emptyText: 'Ce produit n\'a pas encore eu de visites',

        listeners: {
            childtap: 'onVisitsChildTap'
        }
    }]
});
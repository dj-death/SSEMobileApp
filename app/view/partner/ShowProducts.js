Ext.define('App.view.partner.ShowProducts', {
    extend: 'Ext.Panel',
    xtype: 'partnershowproducts',

    iconCls: 'x-fa fa-building-o',
    title: 'Produits gérés',

    header: {
        items: [{
            xtype: 'button',
            handler: 'onProductsCountTap',
            iconCls: 'x-fa fa-eye',
            ui: 'block',
            weigth: 10,
            bind: {
                text: '{record.productscount}',
                tooltip: 'Afficher les produits gérés par <b>{record.name}</b>.'
            }
        }]
    },

    items: [{
        xtype: 'list',
        bind: '{products}',
        //ui: 'thumbnails',
        cls: 'office-details',
        minHeight: 80,

        itemTpl: '{name}',
        emptyText: 'Aucun Produit géré par ce partenaire',

        listeners: {
            childtap: 'onProductsChildTap'
        }
    }]
});

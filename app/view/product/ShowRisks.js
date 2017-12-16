Ext.define('App.view.product.ShowRisks', {
    extend: 'Ext.Panel',
    xtype: 'productshowrisks',

    frame: true,

    title: 'Risques',
    iconCls: 'x-fa fa-warning',

    minHeight: 300,
    layout: 'fit',

    items: [{
        xtype: 'list',
        reference: 'productRisksList',
        
        bind: '{productRisks}',

        cls: 'office-details',
        minHeight: 80,

        itemTpl: '{name}',

        emptyText: 'Ce produit n\'a pas encore eu de risques'
    }]
    
});

Ext.define('App.store.ProductFinances', {
    extend: 'Ext.data.Store',
    alias: 'store.productfinances',

    model: 'App.model.ProductFinance',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false,
    
    sorters: 'exercice'
});

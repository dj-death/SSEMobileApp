Ext.define('App.store.Predicts', {
    extend: 'Ext.data.Store',
    alias: 'store.predicts',

    model: 'App.model.Predict',

    autoLoad: true,
    pageSize: 0
});

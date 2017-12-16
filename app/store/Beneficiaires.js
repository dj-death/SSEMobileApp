Ext.define('App.store.Beneficiaires', {
    extend: 'Ext.data.Store',
    alias: 'store.beneficiaires',

    model: 'App.model.Beneficiaire',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false
});

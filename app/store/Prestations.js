Ext.define('App.store.Prestations', {
    extend: 'Ext.data.Store',
    alias: 'store.prestations',

    model: 'App.model.Prestation',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false
});

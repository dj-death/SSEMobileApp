Ext.define('App.store.Recommandations', {
    extend: 'Ext.data.Store',
    alias: 'store.recommandations',

    model: 'App.model.Recommandation',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false,

    sorters: 'urgency',
});

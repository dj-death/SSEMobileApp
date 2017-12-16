Ext.define('App.store.Impacts', {
    extend: 'Ext.data.Store',
    alias: 'store.impacts',

    model: 'App.model.Impact',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false
});

Ext.define('App.store.Partners', {
    extend: 'Ext.data.Store',
    alias: 'store.partners',

    model: 'App.model.Partner',
    
    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false,

    sorters: 'name'
});

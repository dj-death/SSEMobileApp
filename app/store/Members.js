Ext.define('App.store.Members', {
    extend: 'Ext.data.Store',
    alias: 'store.members',

    model: 'App.model.Member',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false
    
});

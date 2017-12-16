Ext.define('App.store.Projects', {
    extend: 'Ext.data.Store',
	alias: 'store.projects',

    model: 'App.model.Project',
    
    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false,

    sorters: 'commune_sans_intercom'
});

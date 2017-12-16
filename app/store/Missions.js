Ext.define('App.store.Missions', {
    extend: 'Ext.data.Store',
	alias: 'store.missions',

	model: 'App.model.Mission',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false,
    
    sorters: 'name'
});

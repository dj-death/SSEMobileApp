Ext.define('App.store.Visits', {
    extend: 'Ext.data.Store',
	alias: 'store.visits',

	model: 'App.model.Visit',

    sorters: { 
        property: 'startDate', 
        direction: 'DESC'
    },

    //enable remote sorting will make autoload true
    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false
});

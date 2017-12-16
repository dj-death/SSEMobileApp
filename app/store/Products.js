Ext.define('App.store.Products', {
    extend: 'Ext.data.Store',
	alias: 'store.products',

	model: 'App.model.Product',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false,

    sorters: 'commune'
});

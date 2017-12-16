Ext.define('App.store.Finances', {
    extend: 'Ext.data.Store',
    alias: 'store.finances',

    model: 'App.model.Finance',

    remoteFilter: true,
    remoteSort: true,

    sorters: 'exercice'
});

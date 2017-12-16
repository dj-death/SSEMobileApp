Ext.define('App.store.KPIs', {
    extend: 'Ext.data.Store',
    alias: 'store.kpis',

    model: 'App.model.KPI',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: false,
    

    sorters: 'exercice'
});

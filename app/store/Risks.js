Ext.define('App.store.Risks', {
    extend: 'Ext.data.Store',
    alias: 'store.risks',

    model: 'App.model.Risk',

    groupField: 'mtype',
    pageSize: 0
});
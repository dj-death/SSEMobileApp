Ext.define('App.store.INDH.Programmes', {
    extend: 'Ext.data.Store',

    alias: 'store.programmes',

    fields: ['code', 'value'],

    data: [
        { code: 1, value: "Rural" },
        { code: 2, value: "Urbain" },
        { code: 3, value: "Précarité" },
        { code: 4, value: "Transversal" }
    ]

});

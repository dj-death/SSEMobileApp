Ext.define('App.store.metrics.Suffisances', {
    extend: 'Ext.data.Store',

    alias: 'store.suffisances',

    fields: ['value', 'label'],

    data: [
        { value: 0, label: 'Insuffisant' },
        { value: 1, label: 'Suffisant' }
    ]

});
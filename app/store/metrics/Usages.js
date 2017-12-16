Ext.define('App.store.metrics.Usages', {
    extend: 'Ext.data.Store',

    alias: 'store.usages',

    fields: ['value', 'label'],

    data: [
        { value: 0, label: 'Non' },
        { value: 1, label: 'Partielle' },
        { value: 2, label: 'Oui' },
    ]

});
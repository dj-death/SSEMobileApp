Ext.define('App.store.metrics.Degrees', {
    extend: 'Ext.data.Store',

    alias: 'store.degrees',

    fields: ['value', 'label'],

    data: [
        { value: 1, label: 'Faible' },
        { value: 2, label: 'Normal' },
        { value: 3, label: 'Elevé' }
    ]

});
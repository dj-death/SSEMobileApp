Ext.define('App.store.metrics.Satisfactions', {
    extend: 'Ext.data.Store',

    alias: 'store.satisfactions',

    fields: ['value', 'label'],

    data: [
        { value: 0, label: 'non satisfaisante' },
        { value: 1, label: 'satisfaisante' }
    ]

});
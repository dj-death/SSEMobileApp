Ext.define('App.store.metrics.Etats', {
    extend: 'Ext.data.Store',

    alias: 'store.etats',

    fields: ['value', 'label'],

    data: [
        { value: 1, label: 'Médiocre' },
        { value: 2, label: 'Moyen' },
        { value: 3, label: 'Excellent' }
    ]

});
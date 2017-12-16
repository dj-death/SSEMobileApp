Ext.define('App.store.metrics.Qualites', {
    extend: 'Ext.data.Store',

    alias: 'store.qualites',

    fields: ['value', 'label'],

    data: [
        { value: 1, label: 'Médiocre' },
        { value: 2, label: 'Moyen' },
        { value: 3, label: 'Bon' },
    ]

});
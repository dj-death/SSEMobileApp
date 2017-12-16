Ext.define('App.store.metrics.ObjetsEtats', {
    extend: 'Ext.data.Store',

    alias: 'store.objetsetats',

    fields: ['value', 'label'],

    data: [
        { value: 1, label: 'Délabré' },
        { value: 2, label: 'Moyen' },
        { value: 3, label: 'Bon' },
    ]

});
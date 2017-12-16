Ext.define('App.model.KPI', {
    extend: 'App.model.Base',

    fields: [
        { name: 'product_id', reference: 'Product' },

        { name: 'exercice', type: 'int' },

        { name: 'name', type: 'string' },
        { name: 'source', type: 'string' },

        { name: 'value', type: 'float' },
        { name: 'target', type: 'float' },

        { name: 'comment', type: 'string' }

    ],

    proxy: {
        api: {
            prefix: 'Server.kpis'
        }
    }
});

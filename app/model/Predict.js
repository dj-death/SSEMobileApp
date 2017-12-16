Ext.define('App.model.Predict', {
    extend: 'App.model.Base',

    fields: [
        { name: "category", type: 'string' },
        { name: "sentence", type: 'string' },
        { name: "predict", type: 'string' }
    ],

    proxy: {
        api: {
            prefix: 'Server.predicts'
        }
    }
});

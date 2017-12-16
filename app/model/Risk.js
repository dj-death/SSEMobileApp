Ext.define('App.model.Risk', {
    extend: 'App.model.Base',

    fields: [
        'name',
        'mtype',
        'parentId',
        { name: 'productscount', type: 'int', persist: false }
    ],

    proxy: {
        api: {
            prefix: 'Server.risks'
        }
    }

});
// http://docs.sencha.com/extjs/latest/guides/core_concepts/data_package.html
Ext.define('App.model.risk.Base', {
    extend: 'Ext.data.TreeModel',

    identifier: 'uuid',

    requires: [
        'App.model.Base',
        'Ext.data.identifier.Uuid'
    ],

    fields: [{
        name: 'expanded',
        defaultValue: true
    }, {
        name: 'createdAt',
        type: 'date',
        dateFormat: 'C',
        persist: false
    }],

    proxy: {
        api: {
            prefix: 'Server.risks'
        },

        reader: {
            type: 'json',
            rootProperty: 'data',
            typeProperty: 'mtype',
            messageProperty: 'message'
        }
    }

});


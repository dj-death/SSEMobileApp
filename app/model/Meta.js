Ext.define('App.model.Meta', {
    extend: 'Ext.data.Model',

    fields: [
        'tablename', 
        { name: 'create_time', type: 'date', dateFormat: 'C'},
        { name: 'update_time', type: 'date', dateFormat: 'C'}
    ],

    proxy: {
        api: {
            prefix: 'Server.meta'
        }
    }
});

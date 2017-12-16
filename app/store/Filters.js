Ext.define('App.store.Filters', {
    extend: 'App.store.LocalCache',
    alias: 'store.filters',

    config: {
        service: null,
        field: null,
        label: null
    },

    model: 'App.model.Filter',
    remoteFilter: false,
    remoteSort: false,
    pageSize: null,
    autoLoad: true,

    sorters: {
        property: 'label',
        direction: 'ASC'
    },

    updateService: function(service) {
        var proxy = this.getRemoteProxy(),
            api = proxy.api || {};
        api.read = 'Server.' + service + '.filters';
        proxy.api = api;


        this.expireField = App.app.getName() + "-" + service + '-expireDate';
        this.createdAtField = App.app.getName() + "-" + service + '-createdAt';

        this.setLocalStorageProxy({
            type: 'localstorage',
            id: App.app.getName() + "-" + service + "-cache"
        });
    },

    updateField: function(field) {
        var proxy = this.getRemoteProxy(),
            params = proxy.extraParams;

        if (Ext.isEmpty(field)) {
            delete params.field;
        } else {
            params.field = field;
        }
    },

    updateLabel: function(label) {
        var proxy = this.getRemoteProxy(),
            params = proxy.extraParams;

        if (Ext.isEmpty(label)) {
            delete params.label;
        } else {
            params.label = label;
        }
    }
});

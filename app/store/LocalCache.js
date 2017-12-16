Ext.define('App.store.LocalCache', {
    extend: 'Ext.data.Store',
    alias: 'store.localcache',
    
    requires: [
      'Ext.data.proxy.LocalStorage',
      'Ext.data.proxy.Direct'
    ],
    
    config: {
        service: null,
        
        remoteProxy: {
            type: 'direct',
            api: {
                read: null
            },

            extraParams: {},

            reader: {
                type: 'json',
                rootProperty: 'data',
                messageProperty: 'message'
            }
        },

        localStorageProxy: null,

        strategy: {
            type: 'token'
        }
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
    
    load: function(options) {
        var me = this;

        if (!App.app.getMetaStore().isLoaded()) {
            Ext.Function.defer(me.load, 100, me, options);
            return;
        }

        if (this.isCacheMiss()) {
            this.setProxy(this.getLocalStorageProxy());

            // load from localstorage
            this.callParent([{
                scope: this,
                callback: function() {
                    // delete from local storage
                    this.removeAll();
                    this.sync();

                    // load from server
                    this.setProxy(this.getRemoteProxy());

                    // get pointer to superclass load method
                    // note that this.callParent() will not work 
                    // from this context

                    Ext.data.Store.superclass.load.apply(this, [{
                        scope: me,
                        callback: function(records,operation,success) {
                            records = records || [];

                            me.setProxy(this.getLocalStorageProxy());

                            var i = 0,
                                len = records.length;
                            
                            for (; i < len; i++) {
                                records[i].set('dirty', true); 
                            }

                            me.sync(); // write to localstorage
                            me.setCacheExpiration();

                            // perform optional final callback

                            if (typeof options === 'function') {
                                options = {
                                    callback: options
                                };
                            } else {
                                // We may mutate the options object in setLoadOptions. 
                                options = options ? Ext.Object.chain(options) : {};
                            }

                            if (options.callback) {
                                options.callback.call(options.scope, records, operation, success);
                            }

                        } // callback
                    }]); // load
                }  
            }]);

        } else {
            this.setProxy(this.getLocalStorageProxy());
            this.callParent(arguments);
        }
    }, // end function


    isCacheMiss: function() {
        // use date as a default
        
        switch(this.getStrategy().type) {
            
            case 'token' :
                var createdAt  =  window.localStorage.getItem(this.createdAtField) && new Date(window.localStorage.getItem(this.createdAtField));

                if (!createdAt) {
                    return true;
                }

                return (this.getLastUpdated() > createdAt);

            case 'timeout' :
                var expireDate  = window.localStorage.getItem(this.expireField);

                if (expireDate === null) {
                    return true;
                }

                var timeout = new Date(expireDate);
                return (new Date() > timeout);
        }
   },

   getLastUpdated: function () {
        var store = App.app.getMetaStore(),
            meta = store.findRecord('tablename', this.getService());

        if (!meta) {
            return null;
        }

        return meta.get('update_time') || meta.get('create_time');
   },
    
    
    setCacheExpiration: function() {
    
        switch(this.getStrategy().type) {
            case 'token' :
                window.localStorage.setItem(this.createdAtField, new Date());
            break;

            case 'timeout' :
                var expireDate = new Date();
                var duration = this.getStrategy().duration;

                for (var i in duration) {
                    expireDate = Ext.Date.add(expireDate,i,duration[i]);
                }

                window.localStorage.setItem(this.expireField, expireDate);
                
                break;
        }
    },
    
    applyLocalStorageProxy: function(newObj,oldObj) {
    
        if (Ext.Object.getSize(newObj) == 0) { 
            // set default proxy based on storeid
            newObj = {
                type: 'localstorage', 
                id: App.app.getName() + "-" + this.getStoreId()
            };

            return newObj;
        } else {
            return newObj;
        }
    }
});
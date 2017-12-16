Ext.define('App.view.project.BrowseController', {
    extend: 'App.view.widgets.BrowseController',
    alias: 'controller.projectbrowse',

    uses: [
        'App.ux.Signals',
        'Ext.Deferred'
    ],

    control: {
        '#': {
            reset: 'refresh'
        }
    },

    refresh: function() {
        var vm = this.getViewModel();
    },

    onStoreSort: function(store) {
        var me = this,
            grouper = store.getGrouper(),
            sorters = store.getSorters(),

            grid = this.getView().down('grid'),
            isGrouped = grid.getGrouped();

        if (!isGrouped || !grouper) {
            return;
        }

        if (sorters.length > 1 || sorters.first().getProperty() !== grouper.getProperty()) {
            grid.setGrouped(false);
        }
        
    },

    onStoreChange: function() {
        //this.updateFilters(true);
    },

    updateFilters: function(reload) {                      
        var view = this.getView(),
            store = this.getStore(),
            vm = this.getViewModel(),
            collection = store && store.getFilters(),
            filters = vm.get('filters'),
            fields = view.getFields(),
            dirty = !!reload,
            item, value;

        if (filters) {
            if (typeof filters['search'] === 'string' && filters['search'].length <= 3 && filters['search'].length > 0) {
                return;
            }

        } else {
            filters = {};
            
            Ext.Object.each(fields, function(key, value) {
                filters[key] = typeof value.defaultValue !== 'undefined' ?  value.defaultValue : null;
            });

        }


        if (!collection) {
            return;
        }


        // to prevent issue as we already set a filter on status for annulated
        var statut_filter = filters['statut'];
        
        if (statut_filter && statut_filter.isModel)  {
            statut_filter = statut_filter.get('value');
        } else {
            statut_filter = null;
        }


        Ext.Object.each(fields, function(key, field) {
            value = filters[key];

            if (value && value.isModel) {
                value = value.get('value');
            }

            key = field.property || key;
            item = collection.get(key);

            if (key === 'est_annule' && typeof value === 'undefined') {
                value = false;
            }

            if ((item && item.getValue()) == value) {
                return;
            }

            dirty = true;

            if (key === 'est_sousprojet' && value) {
                value = null;
            }


            if (key === 'est_annule') {

                // no double filter
                if (statut_filter !== null) {
                    return;
                }


                if (value == true) {
                    store.removeFilter('statut', true);

                } else {
                    store.filter({
                        property: 'statut',
                        operator: 'notlike',
                        value: 'Annulé'
                    });

                }

            } else {

                if (value == null) {
                    store.removeFilter(key, true);
                } else {
                    store.filter(key, value, true);
                }
            }

        });



        if (dirty) {
            store.removeAll();
            store.load();
        }
        
    },


    onClearFiltersTap: function() {
        this.getViewModel().set('filters', {
            'est_sousprojet': false,
            'est_annule': false
        });
    }

});
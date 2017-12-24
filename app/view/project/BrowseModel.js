Ext.define('App.view.project.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.projectbrowse',

    data: {
        groupBy: 'commune',
        sortOrder: null,
        filteredBy: null
    },

    stores: {
        projects: {
            type: 'projects',
            autoLoad: false,
        
            pageSize: 25, // even if 0 is necessary to allow exporting all data to excel
            clearOnPageLoad: false, // scolling add projet page that will not be cleared
            
            grouper: {
                groupFn: function(record) {
                    return record.get('commune');
                }
            },
            
            listeners: {
                refresh: 'onStoreRefresh',
                filterchange: 'onStoreFiltered',
                sort: 'onStoreSort',
                
                buffer: 100
            }
        },

        // Filters combo

        annees: {
            type: 'annees',
            autoLoad: true
        },

        communes: {
            type: 'communes',
            autoLoad: true
        },

        secteurs: {
            type: 'secteurs',
            autoLoad: true
        },

        soussecteurs: {
            type: 'soussecteurs',
            autoLoad: true
        },

        rubriques: {
            type: 'rubriques',
            autoLoad: true
        },

        programmes: {
            type: 'programmes',
            autoLoad: true
        },

        statuts: {
            type: 'statuts',
            autoLoad: true
        },


        quartiers: {
            type: 'quartiers',
            autoLoad: true
        }

    }
});

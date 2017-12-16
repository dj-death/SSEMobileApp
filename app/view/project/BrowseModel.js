Ext.define('App.view.project.BrowseModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.projectbrowse',

    data: {
        groupBy: 'commune',
        sortOrder: null,
        filteredBy: null
    },

    formulas: {
        statutCls: function (get) {
            var statut = get('record.statut');

            statut = statut && statut.toLowerCase().trim();

            switch (statut) {
                case 'non démarré':
                    return 0;
                    
                case 'non initié':
                case 'en cours d\'étude':
                    return 1;
                    
                case 'en cours de lancement':
                    return 2;

                case 'en cours d\'execution':
                case 'en cours d\'exécution':
                    return 3;

                case 'en retard d\'exécution':
                    return 4;

                case 'achevé (considéré non opérationnel)':
                    return 5;

                case 'opérationnel':
                    return 6;

                case 'en difficulté':
                    return 7;

    
                case 'en arrêt':
                case 'en arrêt d\'activité':
                case 'en souffrance':
                case 'projet mort':
                    return 8;

                
                case 'en cours d\'annulation':
                case 'en cours de résiliation':
                case 'résilié':
                    return 9;

                case 'annulé':
                    return 10;

                default:
                    console.log('Statut non identifié :', statut);
                    return;
            }

        }
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

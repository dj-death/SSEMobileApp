Ext.define('App.view.visit.RecommandationWizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.recommandationwizard',

    data: {
        record: null
    },

    stores: {
        recommandations: {
            type: 'recommandations',
            pageSize: 25,

            autoLoad: true,
            grouper: {
                groupFn: function(record) {
                    return record.get('urgency');
                }
            }
        }
    }
});

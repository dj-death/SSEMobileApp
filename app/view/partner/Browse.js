Ext.define('App.view.partner.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        id: {
            property: 'id'
        },
        
        commune: {
            property: 'commune'
        },

        domaine: {
            property: 'domaine'
        },

        statut_juridique: {
            property: 'statut_juridique'
        }
    },

    controller: 'partnerbrowse',
    viewModel: {
        type: 'partnerbrowse'
    },

    cls: 'partnerbrowse',
    bind: {
        store: '{partners}'
    }
});

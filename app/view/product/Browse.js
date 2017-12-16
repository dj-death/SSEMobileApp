Ext.define('App.view.product.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        id: {
            property: 'id'
        },
        
        partner: {
            property: 'partner_id'
        },

        commune: {
            property: 'commune'
        },

        quartier: {
            property: 'quartier_douar'
        },

        type: {
            property: 'type'
        },

        secteur: {
            property: 'secteur_activite_principal'
        },

        soussecteur: {
            property: 'secteur_activite'
        }
    },

    controller: 'productbrowse',
    viewModel: {
        type: 'productbrowse'
    },

    cls: 'productbrowse',
    bind: {
        store: '{products}'
    }
});

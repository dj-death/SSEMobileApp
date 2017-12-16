Ext.define('App.view.project.Browse', {
    extend: 'App.view.widgets.Browse',

    fields: {
        id: {
            property: 'id'
        },

        annee: {
            property: 'annee'
        },
        
        programme: {
            property: 'programme'
        },

        commune: {
            property: 'commune_sans_intercom'
        },

        nature_commune: {
            property: 'nature_commune'
        },

        quartier: {
            property: 'quartier_douar'
        },

        statut: {
            property: 'statut'
        },

        product: {
            property: 'product_id'
        },

        partner: {
            property: 'partner_id'
        },

        secteur: {
            property: 'secteur_activite_principal'
        },

        soussecteur: {
            property: 'secteur_activite'
        },

        est_AGR: {
            property: 'est_AGR'
        },

        est_EPS: {
            property: 'est_EPS'
        },

        est_projet: {
            property: 'est_projet'
        },

        est_sousprojet: {
            property: 'est_sousprojet',
            defaultValue: false
        },

        est_annule: {
            property: 'est_annule',
            defaultValue: false
        },

        est_infrastructure: {
            property: 'est_infrastructure'
        },

        porteur: {
            property: 'porteur_ajuste'
        },

        en_souffrance: {
            property: 'en_souffrance'
        }
    },

    controller: 'projectbrowse',
    viewModel: {
        type: 'projectbrowse'
    },

    cls: 'projectbrowse',
    bind: {
        store: '{projects}'
    }
});

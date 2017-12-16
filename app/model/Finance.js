Ext.define('App.model.Finance', {
    extend: 'App.model.Base',

    fields: [
        { name: 'partner_id', reference: 'Partner' },

        { name: 'exercice', type: 'int' },

        { name: 'CA_prevu', type: 'float' },
        { name: 'CA_reel', type: 'float' },

        { name: 'resultat_net_reel', type: 'float' },
        { name: 'resultat_net_prevu', type: 'float' },

        { name: 'BFR', type: 'float' },

        { name: 'capitaux_propres', type: 'float' },
        { name: 'dettes_MLT', type: 'float' },
        { name: 'dettes_CT', type: 'float' },

        { name: 'immobilisations', type: 'float' },
        { name: 'creances', type: 'float' },
        { name: 'stocks', type: 'float' },
        { name: 'tresorerie', type: 'float' },

        { name: 'total_subventions', type: 'float' },

        { name: 'loyer', type: 'float' },
        { name: 'total_depenses', type: 'float' },
        { name: 'total_recettes', type: 'float' },
        { name: 'frais_personnel', type: 'float' },
        { name: 'solde', type: 'float' }
    ],

    proxy: {
        api: {
            prefix: 'Server.finances'
        }
    }
});

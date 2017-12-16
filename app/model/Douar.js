Ext.define('App.model.Douar', {
    extend: 'App.model.Base',

    fields: [
        { name: 'nom_fr', type: 'string' },
        { name: 'nom_ar', type: 'string' },

        { name: 'type', type: 'string' },

        { name: 'est_collectivite_trad', type: 'boolean' },
        { name: 'nom_collectivite_trad', type: 'boolean' },

        { name: 'population', type: 'int' },
        { name: 'population_jeune', type: 'int' },
        { name: 'tx_analphabetisme', type: 'float' },

        { name: 'type_habitat', type: 'string' },

        { name: 'location', type: 'auto', defaultValue: {
            "latitude": null,
            "longitude": null
        }},

        { name: 'distance_centre', type: 'float' },
        { name: 'distance_universite', type: 'float' },

        { name: 'has_potentiel_agriculture', type: 'boolean' },
        { name: 'has_potentiel_elevage', type: 'boolean' },
        { name: 'has_potentiel_commerce', type: 'boolean' },
        { name: 'has_potentiel_artisanat', type: 'boolean' },
        { name: 'has_potentiel_autre', type: 'boolean' },

        { name: 'mode_access_route', type: 'string' },
        { name: 'mode_access_electricite', type: 'string' },
        { name: 'mode_access_eau', type: 'string' },
        { name: 'mode_access_assainissement', type: 'string' },


        { name: 'has_ets_scolaires', type: 'boolean' },
        { name: 'has_ets_sante', type: 'boolean' },
        { name: 'has_ets_jeunesse', type: 'boolean' },
        { name: 'has_EPS', type: 'boolean' }


    ],

    proxy: {
        api: {
            prefix: 'Server.douars'
        }
    }
});

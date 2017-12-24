Ext.define('App.model.Product', {
    extend: 'App.model.Base',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'commune', type: 'string' },
        { name: 'quartier_douar', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'location', type: 'auto', defaultValue: {
            "latitude": null,
            "longitude": null
        }},
        
        { name: 'director', type: 'string' },

        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' },

        { name: 'date_creation', type: 'date', dateFormat: 'C'},

        { name: 'partner_id', reference: 'Partner' },

        { name: 'mode_gestion', type: 'string' },

        { name: 'staff', type: 'int' },

        { name: 'activite1_gestionnaire', type: 'string' },
        { name: 'activite2_gestionnaire', type: 'string' },
        { name: 'activite3_gestionnaire', type: 'string' },

        { name: 'type', type: 'string' },
        { name: 'secteur_activite', type: 'string' },
        { name: 'secteur_activite_principal', type: 'string' },

        { name: 'type_AGR', type: 'string' },

        { name: 'tarif_moyen', type: 'float' },
        { name: 'tarifs_comment', type: 'string' },
        { 
            name: 'est_prestation_gratuite', 
            type: 'boolean', 
            depends: 'tarif_moyen',

            calculate: function (data) {
                var tarif = data.tarif_moyen;

                if (Ext.isEmpty(tarif)) {
                    return null;
                }

                return tarif === 0;
            }
        },

        { name: 'capacite_accueil', type: 'int' },

        { name: 'pop_benef_total_prevu', type: 'int' },
        { name: 'pop_benef_homme_prevu', type: 'int' },
        { name: 'pop_benef_femme_prevu', type: 'int' },
        { name: 'pop_benef_jeune_prevu', type: 'int' },
        { name: 'pop_benef_menage_prevu', type: 'int' },

        { name: 'pop_benef_total_reel', type: 'int' },
        { name: 'pop_benef_homme_reel', type: 'int' },
        { name: 'pop_benef_femme_reel', type: 'int' },
        { name: 'pop_benef_jeune_reel', type: 'int' },
        { name: 'pop_benef_menage_reel', type: 'int' },


        { name: 'statut',  type: 'string' },        
        
        { name: 'est_en_activite',  type: 'boolean' },
        { name: 'has_problemes_fonctionnement',  type: 'boolean' },
        { name: 'problemes_fonctionnement',  type: 'string' },

        { name: 'emplois_permanents_total', type: 'int' },
        { name: 'emplois_permanents_homme', type: 'int' },
        { name: 'emplois_permanents_femme', type: 'int' },
        { name: 'emplois_permanents_jeune', type: 'int' },


        { name: 'emplois_occasionnels_total', type: 'int' },
        { name: 'emplois_occasionnels_homme', type: 'int' },
        { name: 'emplois_occasionnels_femme', type: 'int' },
        { name: 'emplois_occasionnels_jeune', type: 'int' },
        
        { 
            name: 'emplois_crees_total', 
            type: 'int',
            depends: ['emplois_permanents_total', 'emplois_occasionnels_total'],

            calculate: function (data) {
                var total = 0;

                if (!isNaN(data.emplois_permanents_total)) {
                    total += data.emplois_permanents_total;
                }

                if (!isNaN(data.emplois_occasionnels_total)) {
                    total += data.emplois_occasionnels_total;
                }

                return total;
            },
            
            // It's the same array. But we need Model#set to see it as modified so it
            // is flushed to the UI
            isEqual: function() {
                return false;
            }
        },


        {
            name: 'besoin_gestion',
            depends: ['type'],
            convert: function(val, rec) {
                var type = rec.get('type'),
                    result;

                switch(type) {
                    case 'AGR':
                        return false;

                    default:
                        return true; 
                }
            }
        },
       
        { name: 'images', type: 'auto', defaultValue: [] },
        
        { name: 'projectscount', type: 'int', persist: false },
        { name: 'visitscount', type: 'int', persist: false },

        { name: 'part_INDH', type: 'int', persist: false },
        { name: 'montant_global', type: 'int', persist: false },

        { name: 'consistance', type: 'string' },

        { name: 'niveau_perennite', type: 'string' },

        { name: 'comment', type: 'string'}

    ],

    manyToMany: {
        RiskProducts: {
            type: 'App.model.Risk',    // The type of the model related to this model.
            role: 'risks',             // Creates a "tracks()" function that returns the Tracks Store.
            field: 'risk_id',                // The primary key of the related model.
            right: {                    // The model related to the Track model.  (Now we are defining the relationship in the other direction.)
                field: 'product_id',    // The primary key of the related model.
                role: 'products'       // Creates a "playlists()" function in the Track model that returns the Playlists Store.
            }
        }
    },

    proxy: {
        api: {
            prefix: 'Server.products'
        }
    }
});

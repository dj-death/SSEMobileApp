Ext.define('App.model.Partner', {
    extend: 'App.model.Base',

    fields: [
        { name: 'code', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'date_creation', type: 'date', dateFormat: 'C'},
        { name: 'president', type: 'string' },

        { name: 'statut_juridique', type: 'string' },
        { name: 'domaine', type: 'string' },

        { name: 'est_rup', type: 'boolean' },

        { name: 'liste_membres', type: 'string' },
        { name: 'liste_membres_join', type: 'string' },

        { name: 'parite', type: 'string' },
        { name: 'effectif', type: 'int' },
        
        { name: 'effectif_bureau', type: 'int' },
        { name: 'effectif_femmes_bureau', type: 'int' },
        { name: 'effectif_jeunes_bureau', type: 'int' },

        { name: 'type_siege', type: 'string' },

        { name: 'commune', type: 'string' },
        { name: 'address', type: 'string' },
        { name: 'location', type: 'auto', defaultValue: {
            "latitude": 33.89352,
            "longitude": -5.54727
        }},
        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'website', type: 'string' },

        { name: 'productscount', type: 'int', persist: false },
        { name: 'projectscount', type: 'int', persist: false },
        { name: 'nb_projects_operationnels', type: 'int', persist: false },
        { name: 'nb_projects_encours', type: 'int', persist: false },
        { name: 'nb_projects_ensouffrance', type: 'int', persist: false },

        { name: 'INDH_contributions', type: 'int', persist: false },

        { name: 'has_dossier_reglementaire', type: 'boolean' },
        { name: 'does_respect_tenue_AG', type: 'boolean' },
        { name: 'date_derniere_AG', type: 'date', dateFormat: 'C'},

        { name: 'has_alternance_membres', type: 'boolean' },

        { name: 'has_cartes_adherants', type: 'boolean' },

        { name: 'has_elaboration_bilan', type: 'boolean' },
        { name: 'has_certification_comptes', type: 'boolean' },
        { name: 'has_accompagnement_formation', type: 'boolean' },

        { name: 'has_budgetisation', type: 'boolean' },
        { name: 'has_audit', type: 'boolean' },
        { name: 'has_qualite_systeme_gestion', type: 'boolean' },
        { name: 'has_rapports', type: 'boolean' },

        { name: 'has_benevoles', type: 'boolean' },
        { name: 'has_salaries_permanents', type: 'boolean' },
        { name: 'has_salaries_occasionels', type: 'boolean' },

        { 
            name: 'type_ressources_humaines',
            persist: false,
            type: 'string',
            calculate: function (data) {
                var result = '';

                if (data.has_benevoles) {
                    result += "bénévole; "
                }

                if (data.has_salaries_permanents) {
                    result += "salariés permanents; "
                }

                if (data.has_salaries_occasionels) {
                    result += "salariés occasionels; "
                }

                return result;
            }
        },


        { name: 'has_autofinancement', type: 'boolean' },
        { name: 'has_cotisations_adherants', type: 'boolean' },
        { name: 'has_subventions_publiques', type: 'boolean' },
        { name: 'has_dons_locaux', type: 'boolean' },
        { name: 'has_dons_internationaux', type: 'boolean' },

        { 
            name: 'type_ressources_financieres',
            type: 'string',
            persist: false,
            calculate: function (data) {
                var result = '';

                if (data.has_autofinancement) {
                    result += "Ressources propres; "
                }

                if (data.has_cotisations_adherants) {
                    result += "Cotisations adhérants; "
                }

                if (data.has_subventions_publiques) {
                    result += "Subventions publiques; "
                }

                if (data.has_dons_locaux) {
                    result += "Dons (en nature/pécunier); "
                }

                if (data.has_dons_internationaux) {
                    result += "Coopération internationale; "
                }

                return result;
            }
        },

        { name: 'has_reseau', type: 'boolean' },
        { name: 'nom_reseau', type: 'string' },

        { name: 'nb_commissions', type: 'int'},

        { name: 'champ_intervention', type: 'string' },
        { name: 'niveau_intervention', type: 'string' },

        { name: 'comment', type: 'string'}
    ],

    proxy: {
        api: {
            prefix: 'Server.partners'
        }
    }
});

Ext.define('App.model.Indicator', {
    extend: 'App.model.Base',

    fields: [
        { name: 'project_id', reference: 'Project' },

        { name: "has_convention_exploitation_maintenance", type: "boolean" },
        { name: "has_avis_services_techniques", type: "boolean" },
        { name: "has_convention_clause_perennite", type: "boolean" },
        { name: "duree_clause_perennite", type: "boolean" },

        { name: "has_competence_commune", type: "boolean" },
        { name: "competence_commune_comment", type: "string" },

        { name: "has_gestion_deleguee_installations", type: "boolean" },
        { name: "has_contractualisation_MOA_gestionnaire", type: "boolean" },
        { name: "est_conforme_CPS", type: "boolean" },
        { name: "has_convention_assistance_marche", type: "boolean" },
        
    ],

    proxy: {
        api: {
            prefix: 'Server.indicators'
        }
    }
});

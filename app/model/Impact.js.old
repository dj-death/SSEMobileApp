Ext.define('App.model.Impact', {
    extend: 'App.model.Base',

    fields: [
        { name: 'project_id', reference: 'Project' },

        { name: "has_impact_aires_naturelles", type: 'boolean', defaultValue: false },
        { name: "has_impact_aires_culturelles", type: 'boolean', defaultValue: false },
        { name: "has_impact_acces_population", type: 'boolean', defaultValue: false },
        { name: "has_impact_pesticides", type: 'boolean', defaultValue: false },
        { name: "has_impact_barrage", type: 'boolean', defaultValue: false },
        { name: "has_impact_sols", type: 'boolean', defaultValue: false },
        { name: "has_impact_eaux", type: 'boolean', defaultValue: false },
        { name: "has_impact_air", type: 'boolean', defaultValue: false },
        { name: "has_impact_dechets", type: 'boolean', defaultValue: false },
        { name: "has_impact_sante_securite", type: 'boolean', defaultValue: false },
        { name: "has_impact_groupes_nonimpliques", type: 'boolean', defaultValue: false },
        { name: "has_impact_reinstallation_pop", type: 'boolean', defaultValue: false },
        { name: "has_impact_expropriation", type: 'boolean', defaultValue: false },
        
        { name: "has_impact_categorie_0S", type: 'boolean', defaultValue: false },
        { name: "has_impact_categorie_1S", type: 'boolean', defaultValue: false },
        { name: "has_impact_categorie_2S", type: 'boolean', defaultValue: false },
        { name: "has_impact_categorie_3S", type: 'boolean', defaultValue: false },
        { name: "has_impact_categorie_0E", type: 'boolean', defaultValue: false },
        { name: "has_impact_categorie_1E", type: 'boolean', defaultValue: false },
        { name: "has_impact_categorie_2E", type: 'boolean', defaultValue: false },
        { name: "has_impact_categorie_3E", type: 'boolean', defaultValue: false },

        { name: "mesures_attenuation", type: 'string' }
        
    ],

    proxy: {
        api: {
            prefix: 'Server.impacts'
        }
    }
});

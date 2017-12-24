Ext.define('App.model.Beneficiaire', {
    extend: 'App.model.Base',

    fields: [
        { name: 'project_id', reference: 'Project' },

        { name: "categorie", type: 'string' },
        { name: "type", type: 'string' },

        { name: 'pop_benef_homme', type: 'int' },
        { name: 'pop_benef_femme', type: 'int' },
        { name: 'pop_benef_jeune', type: 'int' },
        { name: 'pop_benef_total', type: 'int' }
        
    ],

    proxy: {
        api: {
            prefix: 'Server.beneficiaires'
        }
    }
});

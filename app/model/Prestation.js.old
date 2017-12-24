Ext.define('App.model.Prestation', {
    extend: 'App.model.Base',

    fields: [
        { name: 'project_id', reference: 'Project' },

        { name: "categorie", type: 'string' },
        { name: "objet", type: 'string' },
        { name: "quantite", type: 'string' }
        
    ],

    proxy: {
        api: {
            prefix: 'Server.prestations'
        }
    }
});

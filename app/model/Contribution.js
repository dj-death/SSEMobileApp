Ext.define('App.model.Contribution', {
    extend: 'App.model.Base',

    fields: [
        { name: 'project_id', reference: 'Project' },

        { name: "type_partenaire", type: 'string' },
        { name: "denomination_partenaire", type: 'string' },

        { name: 'est_porteur', type: 'boolean'},
        { name: 'est_beneficiaire', type: 'boolean'},
        { name: 'has_contrat_programme', type: 'boolean'},

        { name: 'part', type: 'float'},

        { name: "nature_contribution", type: 'string' }
    ],

    proxy: {
        api: {
            prefix: 'Server.contributions'
        }
    }
});

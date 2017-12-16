Ext.define('App.view.partner.WizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.partnerwizard',

    stores: {
        communes: {
            type: 'communes',
            autoLoad: true
        },
        
        finances: {
            type: 'finances',
            pageSize: 0,
            sorters: 'exercice',
            autoLoad: true
        },

        domaines: {
            type: 'domaines',
            autoLoad: true
        },

        statutsjuridiques: {
            type: 'statutsjuridiques',
            autoLoad: true
        }

    }
});

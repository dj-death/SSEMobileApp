Ext.define('App.view.project.WizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.projectwizard',

    data: {
        record: null
    },

    stores: {
        images: {
            fields: ['id', 'src', 'title'],
            data: []
        },

        products: {
            type: 'filters',
            service: 'products',
            field: 'product.id',
            label: 'product.name'
        },

        partners: {
            type: 'filters',
            service: 'partners',
            field: 'partner.name',
            label: 'partner.name'
        },

        statuts: {
            type: 'statuts',
            autoLoad: true
        },

        motifs: {
            type: 'motifs',
            autoLoad: true
        },

        communes: {
            type: 'communes',
            autoLoad: true
        },

        quartiers: {
            type: 'quartiers',
            autoLoad: true
        },

        secteurs: {
            type: 'secteurs',
            autoLoad: true
        },

        soussecteurs: {
            type: 'soussecteurs',
            autoLoad: true
        },

        programmes: {
            type: 'programmes',
            autoLoad: true
        }
    }
});

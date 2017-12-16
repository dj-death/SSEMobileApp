Ext.define('App.view.product.WizardModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.productwizard',

    data: {
        record: null
    },

    stores: {
        images: {
            fields: ['id', 'src', 'title'],
            data: []
        },

        managements: {
            type: 'filters',
            service: 'partners',
            field: 'partner.id',
            label: 'partner.name'
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
        }

    }
});

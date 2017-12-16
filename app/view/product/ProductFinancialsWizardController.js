Ext.define('App.view.product.ProductFinancialsWizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.productfinancialswizard',

    finalize: function () {
        var vm = this.getViewModel(),
            store = App.app.getProductFinancesStore(),
            record = vm.get('record');

        store.add(record);

        this.callParent(arguments);
    }
});

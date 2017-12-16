Ext.define('App.view.partner.FinancialsWizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.financialswizard',

    finalize: function () {
        var vm = this.getViewModel(),
            store = App.app.getFinancesStore(),
            record = vm.get('record');

        store.add(record);

        this.callParent(arguments);
    }
});

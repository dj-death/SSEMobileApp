Ext.define('App.view.product.KPIWizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.kpiwizard',

    finalize: function () {
        var vm = this.getViewModel(),
            store = App.app.getKPIsStore(),
            record = vm.get('record');

        store.add(record);

        this.callParent(arguments);
    }
});

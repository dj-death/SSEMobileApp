Ext.define('App.view.visit.RecommandationWizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.recommandationwizard',

    finalize: function () {
        var vm = this.getViewModel(),
            store = App.app.getRecommandationsStore(),
            record = vm.get('record');

        store.add(record);

        this.callParent(arguments);
    }
});

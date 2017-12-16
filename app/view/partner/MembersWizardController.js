Ext.define('App.view.partner.MembersWizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.memberswizard',

    finalize: function () {
        var vm = this.getViewModel(),
            store = App.app.getMembersStore(),
            record = vm.get('record');

        store.add(record);

        this.callParent(arguments);
    }
});

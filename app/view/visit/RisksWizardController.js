Ext.define('App.view.visit.RisksWizardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.riskswizard',

    onRiskTap: function (view, item, event) {
        var risk = item.record,
            vm = this.getViewModel(),
            panel = this.getView(),
            store = vm.getStore('visitRisks'),
            msg;

        if (risk) {
            msg = 'Ajout du risque ';
            msg += risk.get('name');

            App.ux.Signals.askUserPermission(msg, function (buttonId) {
                if (buttonId !== "yes") {
                    return false;
                }

                store.add(risk);
                panel.close();
            });

           
        }
    }

});

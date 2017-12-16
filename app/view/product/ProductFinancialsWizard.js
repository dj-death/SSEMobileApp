Ext.define('App.view.partner.ProductFinancialsWizard', {
    extend: 'App.view.partner.FinancialsWizard',
    xtype: [
        'productfinancialswizard',
        'productfinancialscreate',
        'productfinancialsedit'
    ],

    controller: {
        type: 'productfinancialswizard'
    }
});
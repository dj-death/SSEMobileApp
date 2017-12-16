Ext.define('App.view.partner.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.partnershow',

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),
            projects = vm.getStore('projects'),
            products = vm.getStore('products'),
            finances = vm.getStore('finances'),
            members = vm.getStore('members'),
            history = vm.getStore('history');

        if (record) {   
            products.filter('partner_id', record.getId());
            projects.filter('porteur', record.get('name'));
            finances.filter('partner_id', record.getId());
            members.filter('partner_id', record.getId());

            history.filter('recipient.partner_id', record.getId());
        } else {
            products.removeAll();
            projects.removeAll();
            finances.removeAll();
            members.removeAll();

            history.removeAll();
        }

        this.callParent(arguments);
    },


    onPartnerProjectsCountTap: function () {
        this.redirectTo('projects/porteur/' + this.getRecord().get('name'));
    },

    onProductsCountTap: function() {
        this.redirectTo('products/partner/' + this.getRecord().getId());
    },

    onProductsChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo('product/' + record.getId());
        }
    },

    onProjectsChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo('project/' + record.getId());
        }
    },

    onHistoryAllTap: function() {
        this.redirectTo('history/partner/' + this.getRecord().getId());
    },

    onReportChildTap: function(view, location) {
        var record = location.record;
        if (!record) {
            return;
        }

        var imgSrc = record.get('src'),
            view = this.getView(),
            myWindow = Ext.create({
                xtype: 'dialog',
                ownerCmp: view,

                maximized: true,
                closable: true,
                dismissHandler: true,

                layout: 'fit',

                items: [{
                    xtype: 'image',
                    minHeight: 300,
                    width: '100%',
                    src: '/partners/reports/' + imgSrc
                }]
            });

        myWindow.show();
    },

    showFullscreen: function () {
        var view = this.getView(),
            myWindow = Ext.create({
                xtype: 'dialog',
                ownerCmp: view,

                maximized: true,
                closable: true,
                dismissHandler: true,

                layout: 'fit',

                items: [{
                    xtype: 'partnershoworg'
                }]
            });

        myWindow.show();
    },

    onLineSeriesTooltipRender: function (tooltip, record, item) {
        var fieldName = item.field;

        tooltip.setHtml(record.get('exercice') + ': ' +
            Ext.util.Format.dhMoney(record.get(fieldName)));
    },

    onAxisLabelMoneyRender: function (axis, label, layoutContext) {
        return Ext.util.Format.dhMoney(label);
    }
});

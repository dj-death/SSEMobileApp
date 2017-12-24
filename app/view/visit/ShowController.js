Ext.define('App.view.visit.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.visitshow',

    uses: ["Ext.util.Format"],

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),

            //product = record.getProduct() || record._product,

            //products = vm.getStore('products'),
            //recommandations = vm.getStore('recommandations'),
            //risks = vm.getStore('risks'),

            history = vm.getStore('history');

        if (record) {            
            history.filter('recipient.visit_id', record.get('id'));
            //recommandations.filter('visit_id', record.get('id'));
            //products.filter('id', record.get('product_id'));

        } else {
            history.removeAll();
            //recommandations.removeAll();
            //risks.removeAll();
            //products.removeAll();
        }

        this.callParent(arguments);
    },


    /*onProductsRefresh: function(store) {
        var product = store.first(),
            
            vm = this.getViewModel();
            //, risks = vm.getStore('risks');

        if (!product) {
            return;
        }

        var productRisks = product.data.risks;
        
        if (risks) {
            //risks.loadData(productRisks);
            vm.set('riskscount', productRisks.length);
        } else {
            //risks.removeAll();
            vm.set('riskscount', 0);
        }

    },*/



    onVisitsCountTap: function() {
        this.redirectTo('visits/visit/' + this.getRecord().getId())
    },

    onHistoryAllTap: function() {
        this.redirectTo('history/visit/' + this.getRecord().getId());
    },

    onEditTap: function() {
        this.callParent(arguments);
    }

});

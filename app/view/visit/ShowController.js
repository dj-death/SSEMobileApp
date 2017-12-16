Ext.define('App.view.visit.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.visitshow',

    uses: ["Ext.util.Format"],

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),

            //product = record.getProduct() || record._product,

            products = vm.getStore('products'),
            recommandations = vm.getStore('recommandations'),
            risks = vm.getStore('risks'),

            history = vm.getStore('history');

        if (record) {            
            history.filter('recipient.visit_id', record.get('id'));
            recommandations.filter('visit_id', record.get('id'));
            products.filter('id', record.get('product_id'));

        } else {
            history.removeAll();
            recommandations.removeAll();
            risks.removeAll();
            products.removeAll();
        }

        this.callParent(arguments);
    },


    onProductsRefresh: function(store) {
        var product = store.first(),
            
            vm = this.getViewModel(),        
            risks = vm.getStore('risks');

        if (!product) {
            return;
        }

        var productRisks = product.data.risks;
        
        if (risks) {
            risks.loadData(productRisks);
            vm.set('riskscount', productRisks.length);
        } else {
            risks.removeAll();
            vm.set('riskscount', 0);
        }

    },



    onVisitsCountTap: function() {
        this.redirectTo('visits/visit/' + this.getRecord().getId())
    },

    onHistoryAllTap: function() {
        this.redirectTo('history/visit/' + this.getRecord().getId());
    },

    onEditTap: function() {
        this.callParent(arguments);
    },

    saveAsDocx: function() {
        var vm = this.getViewModel(),

            visit = this.getRecord(),
            product = visit.getProduct(),
            risks = vm.getStore('risks'),
            recommandations = vm.getStore('recommandations'),
            recomms = [], productRisks = [];

        recommandations.each(function (recom) {
            recomms.push(recom.data);
        });

        risks.each(function (risk) {
            productRisks.push(risk.data);
        });


        function loadFile(url,callback){
            JSZipUtils.getBinaryContent(url,callback);
        }

        loadFile("templates/fiches/visite.docx",function(error,content){
            if (error) { throw error };

            var zip = new JSZip(content);
            var doc = new Docxtemplater().loadZip(zip);

            var observations = visit.get('observations');

            observations = observations.split('<br/>');
            
            doc.setData({
                productName: product.get('name'),
                date: Ext.util.Format.date(visit.get('startDate'), 'd F Y'),
                responsable: visit.getAssignee().get('fullname'),
                observations: observations,

                "risks": productRisks,
                "recommandations": recomms
            });

            try {
                doc.render()
            }
            catch (error) {
                var e = {
                    message: error.message,
                    name: error.name,
                    stack: error.stack,
                    properties: error.properties,
                }
                console.log(JSON.stringify({error: e}));
                // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
                throw error;
            }

            var out = doc.getZip().generate({
                type:"blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            }); //Output the document using Data-URI

            var fileName = "Fiche Visite " + product.get('name') + ".docx";

            saveAs(out, fileName);
        });
    }

});

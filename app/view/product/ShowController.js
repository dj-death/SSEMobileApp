Ext.define('App.view.product.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.productshow',


    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),
            projects = vm.getStore('projects'),
            partners = vm.getStore('partners'),
            visits = vm.getStore('visits'),

            history = vm.getStore('history'),
            images = vm.getStore('images'),
            markers = vm.getStore('markers'),
            productRisks = vm.getStore('productRisks');

        if (record) {
            markers.loadRecords(record);

            projects.filter('product_id', record.get('id'));
            visits.filter('product_id', record.get('id'));

            var imagesArr = record.get('images'),
                arr = [];

            if (Array.isArray(imagesArr)) {
                imagesArr.forEach(function (img, idx) {
                    arr.push({
                        id: idx,
                        src: img.src,
                        title: img.title
                    });
                });

                images.loadData(arr);

                vm.set('imagescount', imagesArr.length);

            } else {
                images.load();
                vm.set('imagescount', 0);
            }

            if (record.data.risks) {
                productRisks.loadData(record.data.risks);
                vm.set('riskscount', record.data.risks.length);
            } else {
                productRisks.removeAll();
                vm.set('riskscount', 0);
            }

            if (record.get('partner_id')) {
                partners.filter('id', record.get('partner_id'));

                setTimeout(function () {
                    var partner =  partners.first();

                    if (!partner) return;

                    record.set('partner', partner.data);
                }, 1000);

            } else {
                partners.removeAll();
            }

        } else {
            projects.removeAll();
            partners.removeAll();
            visits.removeAll();
            
            images.removeAll();
            history.removeAll();
            markers.removeAll();
            productRisks.removeAll();
        }

        this.callParent(arguments);
    },

    onProjectsCountTap: function() {
        this.redirectTo('projects/product/' + this.getRecord().getId())
    },

    onVisitsCountTap: function() {
        this.redirectTo('visits/product/' + this.getRecord().getId())
    },

    onProjectsChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo('project/' + record.getId());
        }
    },

    onVisitsChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo('visit/' + record.getId());
        }
    },

    onHistoryAllTap: function() {
        this.redirectTo('history/product/' + this.getRecord().getId());
    },

    onPictureTap: function(view, location) {
        var record = location.record;
        if (!record) {
            return;
        }

        var view = this.getView(),
            myWindow = Ext.create({
                xtype: 'dialog',
                ownerCmp: view,

                title: record.get('title'),
                titleAlign: 'center',

                maximized: true,
                closable: true,
                dismissHandler: true,

                layout: 'fit',

                items: [{
                    xtype: 'image',
                    minHeight: 300,
                    width: '100%',
                    src: '/uploads/' + record.get('src')
                }]
            });

        myWindow.show();
    },

    onProductTap: function (view, item, event) {
        var record = item.record;

        if (record) {
            this.redirectTo('product/' + record.getId());
        }
    },


    onVisitTap: function() {
        var me = this,
            
            product = this.getRecord(),
            productId = product.getId(),
            visits = product.visits(),
            diff, lastVisit;

        visits.sort('startDate', 'DESC');

        lastVisit = visits.first();
        diff = lastVisit && Ext.Date.diff(lastVisit.get('startDate'), new Date(), 'd');

        // moins de 180 jours
        if (lastVisit && diff < 180){
            App.ux.Signals.askUserPermission("Ce produit est déjà visité !<br/>Vous voulez modifier la dernière visite ?", function (buttonId) {
				if (buttonId !== "yes") {
                    me.redirectTo('visits/product/' + productId);
					return false;
                }

                me.redirectTo('visit/' + lastVisit.getId());
            });

        } else {
            me.redirectTo('visit/create/product_id/' + productId);
        }

    },

    onGeoLocateTap: function() {
        var me = this,
            rec = this.getRecord();

        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        var onSuccess = function(position) {
            var coords = position.coords;

            rec.set('location', {
                "latitude": coords.latitude,
                "longitude": coords.longitude
            });

            me.saveChanges('Géo-localisation');

            
        };
        
        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
        
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    },

    takePicture: function () {
        var vm = this.getViewModel(),
            record = this.getRecord(),
            images = vm.getStore('images');

        function onSuccess (image_uri) {
            var input = document.createElement('input');
            var formData = new FormData();

            input.type = "file";
            input.multiple = true;
            input.src = image_uri;
                    
            formData.append("picture", input.files[0]);

            var xhr = new XMLHttpRequest();
            xhr.onload = function(oEvent) {
                if (xhr.status == 200) {
                    var resp = Ext.decode(this.responseText, true);
                    var fileName = resp.fileName;
                    var imgsArr = [];
                    
                    images.add({
                        id: images.count(),
                        title: "title",
                        src: fileName
                    });

                    images.each(function (img) {
                        imgsArr.push({
                            title: img.get('title'),
                            src: img.get('src')
                        });
                    });

                } else {
                    App.ux.Signals.showWarning('Echec d\'upload', true);
                }

                
            };

            xhr.open("POST", "http://api-sse.193b.starter-ca-central-1.openshiftapps.com/upload", true);
            xhr.send(formData);

         }
        
        function onFailure (message) {
            App.ux.Signals.showWarning('Echec d\'upload' + message, true);
        }

        navigator.camera.getPicture(onSuccess, onFailure, {
            quality: 100,
            destinationType: navigator.camera.DestinationType.FILE_URI,
            sourceType: navigator.camera.PictureSourceType.CAMERA 
        });

    },

    saveChanges: function (modifType) {
        var rec = this.getRecord();

        rec.save({
            callback: function(result, operation) {    
                if (operation.hasException()) {
                    
                    if (Ext.isObject(formErrors)) {
                        var errNames = Object.keys(formErrors),
                            fieldName = errNames[0],
                            msg = fieldName + ' : ' + formErrors[fieldName];

                        App.ux.Signals.showWarning(msg, true);
                    }

                    return;
                }

                App.ux.Signals.showSuccess(modifType + ' réussie');

                var modification = record.get('name');
                
                me.fireEvent('actionlog', modifType, modification, result);
            }
        });
    }

});

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

                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },

                items: [{
                    xtype: 'component',
                    flex: 1,
                    html: '<div class="name">' +  record.get('title') + '</div>'
                }, {
                    xtype: 'image',
                    flex: 6,
                    minHeight: 300,
                    width: '100%',
                    //src: 'http://192.168.1.4/uploads/' + record.get('src')
                    src: 'http://rest-taqyem.1d35.starter-us-east-1.openshiftapps.com/uploads/' + record.get('src')
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
            vm = this.getViewModel(),
            markers = vm.getStore('markers'),
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

            markers.removeAll();
            markers.loadRecords(rec);

            me.saveChanges('Géo-localisation');

            
        };
        
        // onError Callback receives a PositionError object
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
        }
        
        var location = rec.get('location');
        
        if (location && location.latitude) {

            navigator.notification.confirm(
                'Voulez-vous modifier les coordonnées déjà enregistrées ?',  // message
                function (buttonId) {
                    if (buttonId != 1) {
                        return false;
                    }

                    navigator.geolocation.getCurrentPosition(onSuccess, onError);

                },              // callback to invoke with index of button pressed
                'Coordonnées spatiales',            // title
                ['Oui' ,'Non']          // buttonLabels
            );

        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        }
    },

    takePicture: function () {
        var me = this,
            vm = this.getViewModel(),
            record = this.getRecord(),
            images = vm.getStore('images');

        function onSuccess (imageURI) {
            var options = new FileUploadOptions();

            options.fileKey="file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
 
            var params = new Object();

            params.value1 = "test";
            params.value2 = "param";
 
            options.params = params;
            options.chunkedMode = false;

            navigator.notification.activityStart("", "Envoi en cours");
 
            var ft = new FileTransfer();
            ft.upload(imageURI, /*"http://192.168.1.4/upload/"*/ "http://rest-taqyem.1d35.starter-us-east-1.openshiftapps.com/upload/", function (resp) {
                navigator.notification.activityStop();

                var respObj = Ext.decode(resp.response, true);
                var fileName = respObj.fileName;
                var imgsArr = [];

                var title = record.get('intitule') || record.get('name');
                title += ",  ";
                title += Ext.util.Format.date(new Date(), "d/m/Y");

                images.add({
                    id: images.count(),
                    title: title,
                    src: fileName
                });

                images.each(function (img) {
                    imgsArr.push({
                        title: img.get('title'),
                        src: img.get('src')
                    });
                });

                vm.set('imagescount', imgsArr.length);
                

                record.set('images', imgsArr);

                me.saveChanges('Image');


            }, function(error) {
                navigator.notification.activityStop();
                alert("An error has occurred: Code = " +  error.code);
            }, options);

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
                    App.ux.Signals.showWarning("Modification non enregistrée !", true);
                    return;
                }

                App.ux.Signals.showSuccess(modifType + ' réussie');

                var modification = record.get('name');
                
                me.fireEvent('actionlog', modifType, modification, result);
            }
        });
    }

});

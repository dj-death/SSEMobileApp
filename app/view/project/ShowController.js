Ext.define('App.view.project.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.projectshow',

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),
            /*finances = vm.getStore('finances'),
            engagements = vm.getStore('engagements'),*/
            markers = vm.getStore('markers'),
            images = vm.getStore('images'),
            history = vm.getStore('history'),
            finData, sums;            

        if (record) {  
            markers.loadRecords(record);

            sums = record.get('montant_global');
            /*finData = [
                {id : 0, partner: 'INDH', contribution: record.get('part_INDH'), percent: Ext.util.Format.round(record.get('part_INDH') / sums, 4)},
                {id : 1, partner: record.get('porteur'), contribution: record.get('participation_partenaires'), percent: Ext.util.Format.round(record.get('participation_partenaires') / sums, 4)},
                {id : 2, partner: 'Bénéficiaires', contribution: record.get('contribution_beneficiaires'), percent: Ext.util.Format.round(record.get('contribution_beneficiaires') / sums, 4)}
            ];

            finances.loadData(finData);
            engagements.loadData([
                {id: 0, phase: 'Programmation', amount: record.get('part_INDH')},
                {id: 1, phase: 'Engagement', amount: record.get('montant_engage')},
                {id: 2, phase: 'Emission', amount: record.get('montant_emis')}
            ]);*/

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

        } else {
            markers.removeAll();            
            //projects.removeAll();

            history.removeAll();
            /*finances.removeAll();
            engagements.removeAll();*/
            images.removeAll();
        }

        this.callParent(arguments);
    },

    onProjectsCountTap: function() {
        //this.redirectTo('projects/project/' + this.getRecord().getId())
    },

    onProjectsChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            //this.redirectTo('projects/id/' + record.getId());
        }
    },

    onHistoryAllTap: function() {
        //this.redirectTo('history/project/' + this.getRecord().getId());
    },

    /*onFinancesChartTooltipRender: function (tooltip, record, item) {
        var text = record.get('partner') + ': ' + Ext.util.Format.dhMoney(record.get('contribution'));
        text += ' ( ' + Ext.util.Format.percent(record.get("percent")) + ' )';

        tooltip.setHtml(text);
    },

    onEngagementChartTooltipRender: function (tooltip, record, item) {
        var text = record.get('phase') + ': ' + Ext.util.Format.dhMoney(record.get('amount'));
        tooltip.setHtml(text);
    },*/


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


    onEditTap: function() {
        var rec = this.getRecord(),
            programme = rec.get('est_AGR') ? 'AGR' : rec.get('programme'),
            user = App.user,
            userProgramme = user.get('programme');

        if (user.get('role') > 0 && userProgramme !== 'Tous') {
            if (programme !== userProgramme) {
                this.redirectTo('page403');
                return;
            }
        }

        this.callParent(arguments);
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

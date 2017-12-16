Ext.define('App.view.project.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.projectshow',

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),
            /*finances = vm.getStore('finances'),
            engagements = vm.getStore('engagements'),*/
            images = vm.getStore('images'),
            history = vm.getStore('history'),
            finData, sums;

        if (record) {            
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

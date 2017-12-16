Ext.define('App.view.product.WizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.productwizard',

    config: {
        firstTime: true
    },

    reset: function () {
        var me = this,
            vm = this.getViewModel();

        vm.getStore('managements').reload();
    },

    onShow: function() {
        var me = this,
            vm = this.getViewModel(),
            record = vm.get('record');

        this.callParent(arguments);
    },

    onRefreshView: function () {
        var vm = this.getViewModel(),
            record = vm.get('record'),
            kpis = App.app.getKPIsStore();
            finances = App.app.getProductFinancesStore(),
            images = vm.getStore('images');

        if (record) {
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

            } else {
                images.load();
            }

            if (record.isPhantom()) {
                kpis.removeAll();
                finances.removeAll();

            } else {
                kpis.filter('product_id', record.getId());
                finances.filter('product_id', record.getId());
            }

        } else {
           images.removeAll();
           finances.removeAll();
        }

        this.setFirstTime(false);

    },

    removeReport: function (grid, context) {
        var me = this,
            view = me.getView(),
            record = context.record,

			msg = "Continuer la Suppression ?",

            callback = function() {
                view.unmask();
            },
			
			handler = function (buttonId) {
				if (buttonId !== "yes") {
					return false;
				}
				
				view.mask({
                    xtype: 'loadmask',
                    message: "Suppression ..."
                });

                record.erase({
                    callback: function(result, operation) {
                        App.ux.Signals.CRUDCallback(record, operation, null, callback);
                    }
                });
			};
			
		App.ux.Signals.askUserPermission(msg, handler);
    },

    onReportEdit: function(dataview, location) {
        var record = location.record;

        if (!record) {
            return;
        }

        Ext.create({
            xtype: 'productfinancialsedit',
            record: record,
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }

        }).show();
    },


    onCreateReport: function () {
        var me = this,
            newRecord = Ext.create('App.model.ProductFinance'),
            vm = me.getViewModel(),
            partner = vm.get('record');

        if (!partner.isPhantom()) {
            newRecord.set('product_id', partner.getId());
        }

        Ext.create({
            xtype: 'productfinancialscreate',
            record: newRecord,
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }

        }).show();
    },

    onAddPicture: function (cmp, value) {
        var vm = this.getViewModel(),
            record = vm.get('record'),
            images = vm.getStore('images');
            form = this.getView();

        if (this.getFirstTime()) {
            return;
        }

        Ext.Msg.show({
            title    : 'Ajouter une nouvelle image',
            message  : 'Titre',
            width: 600,
            buttons  : Ext.MessageBox.OKCANCEL,
            scope    : null,
            prompt   : true,
            defaultFocus: 'textfield',
            multiLine: true,

            fn: function (buttonId, title) {
                if (buttonId !== "ok") {
                    return false;
                }

                form.submit({
                    method: 'POST',
                    url: '/upload',
                    waitMsg: 'Envoi du fichier...',

                    success: function (form, result) {
                        var fileName = result.fileName;

                        
                        images.add({
                            id: images.count(),
                            title: title,
                            src: fileName
                        });

                        App.ux.Signals.showSuccess('Envoi réussi');
                    },

                    failure: function (f, a) {
                        App.ux.Signals.showWarning('Echec d\'upload', true);
                    }
                });

            }

        });

    },

    onPictureTap: function(view, location) {
        var record = location.record;
        if (!record) {
            return;
        }

        var me = this,
            view = me.getView(),
			msg = "Continuer la Suppression ?",
			
			handler = function (buttonId) {
				if (buttonId !== "yes") {
					return false;
				}
				
                record.erase();
			};
			
		App.ux.Signals.askUserPermission(msg, handler);
    },


    onCreateKPI: function () {
        var me = this,
            newRecord = Ext.create('App.model.KPI'),
            vm = me.getViewModel(),
            record = vm.get('record');

        if (!record.isPhantom()) {
            newRecord.set('product_id', record.getId());
        }

        Ext.create({
            xtype: 'kpicreate',
            record: newRecord,
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }

        }).show();
    },

    removeKPI: function (grid, context) {
        var me = this,
            view = me.getView(),
            record = context.record,

			msg = "Continuer la Suppression ?",

            callback = function() {
                view.unmask();
            },
			
			handler = function (buttonId) {
				if (buttonId !== "yes") {
					return false;
				}
				
				view.mask({
                    xtype: 'loadmask',
                    message: "Suppression ..."
                });

                record.erase({
                    callback: function(result, operation) {
                        App.ux.Signals.CRUDCallback(record, operation, null, callback);
                    }
                });
			};
			
		App.ux.Signals.askUserPermission(msg, handler);
    },

    onKPIEdit: function(dataview, location) {
        var record = location.record;

        if (!record) {
            return;
        }

        Ext.create({
            xtype: 'kpiedit',
            record: record,
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }

        }).show();
    },

    onSubmitTap: function () {
        var me = this,
            vm = this.getViewModel(),
            record = vm.get('record'),
            images = vm.getStore('images'),
            imgsArr = [];

        if (!images.count()) {
            this.callParent(arguments);
            return;
        }

        images.each(function (img) {
            imgsArr.push({
                title: img.get('title'),
                src: img.get('src')
            });
        });

        record.set('images', imgsArr);

        this.callParent(arguments);
    },

    finalize: function (result) {
        var me = this,
            vm = me.getViewModel(),
            product = vm.get('record');

        if (!result) {
            this.callParent(arguments);
            return;
        }

        var projects = product.projects();

        projects.each(function (elm) {            
            if (product.get("pop_benef_totale") !== elm.get('pop_benef_totale')) {
                elm.set('pop_benef_totale', product.get('pop_benef_totale'));

                elm.save();
            }
        });

        var id = result.getId(),
            finances = App.app.getProductFinancesStore(),
            kpis = App.app.getKPIsStore(),
            records = [],

            onError = function (err) {
                if (err) {
                    console.log(err);
                }

                App.ux.Signals.showWarning('Echec d\'ajout des données', true);
            };


        if (!finances.count() || !kpis.count()) {
            me.callParent(arguments);
            return;

        }
        
        finances.each(function (rec) {
            records.push(rec);
        });

        kpis.each(function (rec) {
            records.push(rec);
        });

        // Invoke child until array has elements, no loops are needed here
        _process(records.shift(), id).then(function next() {

            if (records.length) {
                return _process(records.shift(), id).then(next, onError);
            }

            App.view.product.WizardController.superclass.finalize.apply(me, [result]);

        }).otherwise(onError);
                    
    }

});

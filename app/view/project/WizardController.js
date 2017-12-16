Ext.define('App.view.project.WizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.projectwizard',

    config: {
        firstTime: true
    },

    reset: function () {
        var vm = this.getViewModel();

        vm.getStore('products').reload();
    },

    onShow: function() {

        var me = this,
            vm = this.getViewModel(),
            record = vm.get('record'),
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

        } else {
           images.removeAll();
        }

        this.setFirstTime(false);

        this.callParent(arguments);
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

    onSubmitTap: function () {
        var me = this,
            form = this.getView(),
            vm = this.getViewModel(),
            record = vm.get('record'),
            images = vm.getStore('images'),
            imgsArr = [];

        if (record.get('product_id') === '') {
            record.set('product_id', null);
        }

        if (images.count()) {
            images.each(function (img) {
                imgsArr.push({
                    title: img.get('title'),
                    src: img.get('src')
                });
            });

            record.set('images', imgsArr);
        }


        if (!record.isModified('convention')) {
            this.callParent(arguments);
            return;
        }
        
        form.submit({
            method: 'POST',
            url: '/upload',
            waitMsg: 'Envoi du fichier...',

            success: function (form, result) {
                console.log(result);

                var fileName = result.fileName;
                record.set('convention', fileName);

                App.view.project.WizardController.superclass.onSubmitTap.apply(me);
            },

            failure: function (f, a) {
                App.ux.Signals.showWarning('Echec d\'upload', true);
            }
        });

    }
});

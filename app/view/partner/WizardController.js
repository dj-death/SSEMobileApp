function _process (rec, id) {
    var deferred = new Ext.Deferred(); // create the Ext.Deferred object

    rec.set('partner_id', id);

    rec.save({
        callback: function (result, operation) {
            if (operation.exception) {
                deferred.reject(operation.exception);
            } else {
                deferred.resolve(result);
            }
        }
    }); 

    return deferred.promise;
}

Ext.define('App.view.partner.WizardController', {
    extend: 'App.view.widgets.WizardController',
    alias: 'controller.partnerwizard',

    reset: function () {
        var me = this,
            vm = this.getViewModel();

        vm.getStore('communes').reload();
    },


    onShow: function() {
        this.callParent(arguments);
        
        var me = this,
            vm = this.getViewModel(),
            record = vm.get('record'),
            members = App.app.getMembersStore(),
            finances = App.app.getFinancesStore();

        if (record.isPhantom()) {
            finances.removeAll();
            members.removeAll();

        } else {
            finances.filter('partner_id', record.getId());
            members.filter('partner_id', record.getId());
        }
    },

    doAction: function(type, record) {
        //this.fireEvent('actionlog', type, record || this.getRecord());
    },

    refresh: function() {
        this.getViewModel().getStore('communes').reload();
    },


    onCreateMember: function () {
        var me = this,
            newRecord = Ext.create('App.model.Member'),
            vm = me.getViewModel(),
            partner = vm.get('record');

        if (!partner.isPhantom()) {
            newRecord.set('partner_id', partner.getId());
        }

        Ext.create({
            xtype: 'memberscreate',
            record: newRecord,
            centered: true,
            floated: true,
            modal: true,
            ui: 'dialog',
            toolbar: {
                docked: 'bottom'
            }

        }).show();

        this.doAction('création de membre', newRecord);
    },

    removeMember: function (grid, context) {
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

                        me.doAction('suppression de membre', record);
                    }
                });
			};
			
		App.ux.Signals.askUserPermission(msg, handler);
    },

    onMemberEdit: function(dataview, location) {
        var record = location.record;

        if (!record) {
            return;
        }

        Ext.create({
            xtype: 'membersedit',
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
            xtype: 'financialsedit',
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
            newRecord = Ext.create('App.model.Finance'),
            vm = me.getViewModel(),
            partner = vm.get('record');

        if (!partner.isPhantom()) {
            newRecord.set('partner_id', partner.getId());
        }

        Ext.create({
            xtype: 'financialscreate',
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

    finalize: function (result) {
        var me = this,
            vm = me.getViewModel(),
            visit = vm.get('record');

        if (!result) {
            this.callParent(arguments);
            return;
        }

        var partnerId = result.getId(),
            finances = App.app.getFinancesStore(),
            members = App.app.getMembersStore(),
            records = [],

            onError = function (err) {
                if (err) {
                    console.log(err);
                }

                App.ux.Signals.showWarning('Echec d\'ajout des rapports', true);
            };


        if (!finances.count() || !members.count()) {
            me.callParent(arguments);
            return;

        }
        
        finances.each(function (rec) {
            records.push(rec);
        });

        members.each(function (rec) {
            records.push(rec);
        });

        // Invoke child until array has elements, no loops are needed here
        _process(records.shift(), partnerId).then(function next() {

            if (records.length) {
                return _process(records.shift(), partnerId).then(next, onError);
            }

            App.view.partner.WizardController.superclass.finalize.apply(me, [result]);

        }).otherwise(onError);
                    
    },

    onSubmitTap: function (cmp, newValue, oldValue) {
        var me = this,
            form = this.getView(),
            vm = this.getViewModel(),
            members = App.app.getMembersStore(),
            liste = '',
            record = vm.get('record');

        members.each(function (m) {
            liste = liste + m.get('CIN') + ' ' + m.get('firstname') + ' ' + m.get('lastname') + ' ' + m.get('occupation') + ';';
        });

        record.set('liste_membres_join', liste);

        if (!record.isModified('liste_membres')) {
            me.callParent();
            return;
        }

        form.submit({
            method: 'POST',
            url: '/upload',
            waitMsg: 'Envoi du fichier...',

            success: function (form, result) {
                var fileName = result.fileName;
                record.set('liste_membres', fileName);

                App.view.partner.WizardController.superclass.onSubmitTap.apply(me);
            },

            failure: function (f, a) {
                App.ux.Signals.showWarning('Echec d\'upload', true);
            }
        });
    }
});

Ext.define('App.view.widgets.ShowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.show',

    uses: [
        'Ext.History',
        'App.ux.Signals'
    ],

    control: {
        '#': {
            recordchange: 'onRecordChange'
        }
    },

    type: null,

    init: function () {
        this.callParent(arguments);

        var me = this,
            hash = location.hash.slice(1).split('/')[0];

        if (!hash.endsWith('s')) {
            hash += 's';
        }

         var me = this,
            vm = this.getViewModel(),
            hash = location.hash.slice(1).split('/')[0],
            newHash = hash[hash.length - 1] === 's' ? hash : (hash + 's');

        if (hash === 'people') {
            newHash = hash;
        }


        switch(newHash) {
            case 'products':
                this.type = 'produit';
                break;

            case 'projects':
                this.type = 'projet';
                break;

            case 'partners':
                this.type = 'partenaire';
                break;

            case 'people':
                this.type = 'utilisateur';
                break;

            case 'visits':
                this.type = 'visite';
                break;

            case 'finances':
                this.type = 'état financier';
                break;

            default:
                this.type = 'enregistrement';
        }

        /*Ext.defer(function () {
            if (!me.getRecord()) {
                me.redirectTo(hash);
            }

        }, 3000, this);*/

    },

    getRecord: function() {
        return this.getViewModel().get('record');
    },

    onRecordChange: function(view, record) {
        this.getViewModel().set('record', record);

        var vm = this.getViewModel(),
             history = vm.getStore('history');

        if (record && history) {
            history.filter('object', record.toUrl());
        }

        // Scroll to the top of the view but make sure that the view is still
        // valid since the record is reset to null when the view is destroyed.
        if (!view.destroyed) {
            var scrollable = view.getScrollable();

            scrollable && scrollable.scrollTo(null, 0, true);
        }
    },

    onBackTap: function() {
        Ext.History.back();
    },

    onEditTap: function() {
        this.redirectTo(this.getRecord().toEditUrl());
    },

    onDeleteTap: function() {
        var me = this,
            view = me.getView(),
            record = me.getRecord(),

			msg = "Continuer la Suppression ?",

            callback = function() {
                view.unmask();
                Ext.History.back();
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
                        me.fireEvent('actionlog', 'Suppression ' + me.type, record.get('name') || record.get('intitule'), record);
                    }
                });
            };
            

        if (App.user.get('role') > 1) {
            this.redirectTo('page403');
            return;
        }
			
		App.ux.Signals.askUserPermission(msg, handler);
    },

    onPeopleChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record);
        }
    },

    onHistoryChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getRecipient());
        }
    },

    onHistoryAllTap: function() {
        this.redirectTo('history/recipient/' + this.getRecord().getId());
    }
});

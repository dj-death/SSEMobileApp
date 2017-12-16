Ext.define('App.view.mission.ShowController', {
    extend: 'App.view.widgets.ShowController',
    alias: 'controller.missionshow',

    requires: [
        'App.store.schedule.Remote',
        'App.util.Remote'
    ],


    init: function() {
        this.callParent(arguments);

        this.loadCalendarData();
    },

    privates: {

        /**
         * @param {string} type Type of auth to load (google or guest)
         */
        loadCalendarData: function(type) {
            var me = this,
                vm = me.getViewModel();

            Ext.Deferred.resolved(me.getGuestUser)
                .then(function(user) {
                    vm.set('user', user);
                    return me.getGuestStore();
                })
                .then(function(store) {
                    vm.set('calendars', store);
                    store.load();
                });
        },

        getGuestUser: function() {
            return null;
        },

        getGuestStore: function() {
            return Ext.getStore({ type: 'calendar-remote' });
        }

    },

    onRecordChange: function(view, record) {
        var vm = this.getViewModel(),
        view = this.getView(),
            visits = vm.getStore('visits'),
            calendars = vm.get('calendars').getEventSource();

        view.setMasked(true);

        if (record) {
            visits.filter('mission_id', record.get('id'));
            calendars.filter('mission_id', record.get('id'));

        } else {
            visits.removeAll();
            calendars.removeAll();
        }

        this.callParent(arguments);
    },


    onStoreRefresh: function (store) {
        var view = this.getView();

        view.setMasked(false);
    },

    onVisitsCountTap: function() {
        this.redirectTo('visits/mission/' + this.getRecord().getId())
    }

});

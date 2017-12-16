Ext.define('App.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',

    control: {
        '#': {
            routechange: 'onRouteChange',
            reset: 'refresh'
        }
    },

    init: function() {
        this.callParent(arguments);
        this.update();
    },

    initViewModel: function(vm) {
        vm.bind('{range}', this.onRangeChange, this);
    },

    update: function() {
        var me = this,
            vm = me.getViewModel(),
            now = new Date(),
            hours = now.getHours();

        vm.set({
            time: now,
            greeting:
                Ext.Date.isWeekend(now)? "Bon week-end" :
                hours < 13? "Bonjour" :
                hours < 17? "Bon après-midi" :
                "Bonsoir"
        });

        Ext.defer(function() {
            // The view might have been destroyed (e.g. user deauthentication)
            if (!me.destroyed) {
                me.update();
            }
        }, (60 - now.getSeconds()) * 1000);
    },

    refresh: function() {
        var me = this,
            vm = this.getViewModel();

        vm.getStore('history').load();
        vm.getStore('visits').load();
        vm.getStore('people').load();
    },

    onRangeChange: function(range) {
        var D = Ext.Date,
            vm = this.getViewModel(),
            store = vm.getStore('visits'),
            today = D.clearTime(new Date()),
            direction = 'DESC',
            filters = [];

        switch (range) {
        case 'upcoming':
            direction = 'ASC';
            filters.push({
                property: 'startDate',
                value: D.add(today, D.DAY, 1)
            });
            break;
        case 'past':
            filters.push({
                property: 'endDate',
                value: D.add(today, D.DAY, -7)
            });
            break;
        case 'recent':
        default:
            filters.push({
                property: 'startDate',
                value: D.add(today, D.DAY, -7)
            }, {
                property: 'endDate',
                value: D.add(today, D.DAY, 1)
            });
            break;
        }

        store.clearFilter(true);
        store.filter(filters, false, false);
        store.sort('startDate', direction);

        var user = App.user,
            people = vm.getStore('people'),
            collegues = [];


        people.load({
            callback: function () {
                people.filter('programme', user.get('programme'));
                people.each(function (rec) {
                    collegues.push(rec.getId());
                });

                // not SSE
                if (user.get('role') > 1) {
                    vm.getStore('history').filter({
                        property: 'recipient_id',
                        operator: 'in',
                        value: collegues
                    });
                } 

            }
        });
        
    },

    onRouteChange: function(view, route) {
        var me = this,
            matches = (route || '').match(/(recent|upcoming|past)/g);

        if (matches) {
            this.getViewModel().set('range', matches[0]);
        }
    },

    onEventChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getPerson());
        }
    },

    onHistoryChildTap: function(view, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record.getRecipient());
        }
    },

    onHistoryAllTap: function() {
        this.redirectTo('history');
    }
});

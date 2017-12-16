Ext.define('App.model.Event', {
    extend: 'App.model.Visit',

    fields: [
        // Calculated fields
        // 'days_to_now' is used in store to locally sort and group events.
        { 
            name: 'days_to_now', 
            depends: 'startDate',
            persist: false,
            calculate: function (data) {
                return data.date? Ext.Date.diff(
                    Ext.Date.clearTime(new Date()),
                    Ext.Date.clearTime(data.startDate),
                    'd') : null;
            }
        }

    ],

    proxy: {
        api: {
            prefix: 'Server.events'
        }
    }
});

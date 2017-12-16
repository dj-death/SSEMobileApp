var statusNames = {
    0: "Annulée",
    1: "Reportée",
    2: "En attente",
    3: "En cours d'exécution",
    4: "Achevée"
};
                
Ext.define('App.model.Mission', {
    extend: 'App.model.Base',

    fields: [
        { name: 'name', type: 'string' },
        { name: 'motive', type: 'string' },
        { name: 'start_date', type: 'date', dateFormat: 'C'},
        { name: 'end_date', type: 'date', dateFormat: 'C'},
        { name: 'status', type: 'int', defaultValue: 2 },
        { name: 'status', type: 'int', defaultValue: 2 },
        {
            name: 'statusName',
            depends: 'status',
            convert: function(val, rec) {
                var status = rec.get('status');
                return statusNames[status];
            }
        },
        // Calculated fields
        // 'days_to_now' is used in store to locally sort and group events.
        { 
            name: 'days_to_now', 
            calculate: function (rec) {
                var startDate = rec.start_date;
                
                if (!startDate) return null;

                return Ext.Date.diff(Ext.Date.clearTime(startDate), Ext.Date.clearTime(new Date()), 'd');
            }
        },
        { 
            name: 'days_remaining', 
            calculate: function (rec) {
                var endDate = rec.end_date;
                
                if (!endDate) return null;

                var remains = Ext.Date.diff(Ext.Date.clearTime(new Date()), Ext.Date.clearTime(endDate), 'd');

                return remains > 0 ? remains : 0;
            }
        },

        { name: 'projectscount', type: 'int', persist: false },
        { name: 'visitscount', type: 'int', persist: false }
    ],

    proxy: {
        api: {
            prefix: 'Server.missions'
        }
    }
});

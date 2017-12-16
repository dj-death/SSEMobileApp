Ext.define('App.model.Recommandation', {
    extend: 'App.model.Base',

    fields: [
        { name: 'title' },
        { name: 'content' },
        { name: 'note' },

        { name: 'destination', type: 'string' },

        { name: 'done', type: 'boolean', defaultValue: false },
        
        { name: 'importance', type: 'string' },
        { name: 'urgency', type: 'string' },

        { name: 'visit_id', reference: 'Visit' },

        {
            name: 'due',
            type: 'date',
            dateFormat: 'c',

            depends: 'urgency',

            convert: function(val, rec) {
                var urgency = rec.get('urgency'),
                    startDate = rec.get('created'),
                    period,
                    due;

                switch (urgency) {
                    case '1 jour':
                        period = 1;
                        break;

                    case '1 semaine':
                        period = 7;
                        break;

                    case '1 mois':
                        period = 30;
                        break;

                    case '6 mois':
                        period = 180;
                        break;

                    default:
                        period = 180;
                }

                if (!startDate || !period) return null;

                due = Ext.Date.add(new Date(startDate), Ext.Date.DAY, period);

                return due;
            }
        },

        { 
            name: 'days_remaining', 
            calculate: function (rec) {
                var due = rec.due;
                
                if (!due) return null;

                return Ext.Date.diff(Ext.Date.clearTime(due), Ext.Date.clearTime(new Date()), 'd');
            }
        },

        { name: 'created', type: 'int', persist: false }

    ],

    proxy: {
        api: {
            prefix: 'Server.recommandations'
        }
    }

});
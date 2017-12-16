Ext.define('App.store.schedule.Remote', {
    extend: 'Ext.calendar.store.Calendars',
    alias: 'store.calendar-remote',

    /*proxy: {
		type: 'rest',
        url: '/api/visits',
		
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        }
    }*/

    data: {
        calendars: [{
            "id": 0,
            "title": "Tables rondes"
        }, {
            "id": 1,
            "title": "Réunions / services extérieurs"
        }, {
            "id": 2,
            "title": "Visites de suivi-évaluation"
        }]
    },

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            rootProperty: 'calendars'
        }
    },

    eventStoreDefaults: {
        model: 'App.model.Visit',

        autoSync: true,
        autoLoad: true,
        asynchronousLoad: true,

        proxy: {
            type: 'direct',        
            api: {
                prefix: 'Server.visits',

                create: 'insert',
                read: 'list',
                update: 'updateEvent',
                destroy: 'remove'
            },
            
            reader: {
                type: 'json',
                rootProperty: 'data',
                messageProperty: 'message'
            } 
        }
    }
});

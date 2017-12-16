Ext.define('App.view.home.HomeModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.home',

    data: {
        greeting: null,
        range: 'upcoming',
        time: null
    },

    stores: {
        people: {
            type: 'people',
            remoteFilter: false
        },


        history: {
            type: 'actions',
            autoLoad: true,
            pageSize: 8
        },
        
        visits: {
            type: 'visits',
            autoLoad: true,
            pageSize: 25
        }
    }
});

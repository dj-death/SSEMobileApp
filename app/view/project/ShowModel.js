Ext.define('App.view.project.ShowModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.projectshow',

    data: {
        imagecount: null
    },

    stores: {
        images: {
            fields: ['id', 'src', 'title'],
            data: []
        },
        
        /*finances: {
            fields: ['id', 'partner', 'contribution', 'percent'],
            date: []
        },

        engagements: {
            fields: ['id', 'phase', 'amount'],
            date: []
        },*/

        history: {
            type: 'actions',
            autoLoad: true,
            pageSize: 12
        }
    }
});

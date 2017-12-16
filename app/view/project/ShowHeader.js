Ext.define('App.view.project.ShowHeader', {
    extend: 'App.view.widgets.ShowHeader',
    xtype: 'projectshowheader',

    cls: 'show-header',
    weighted: true,

    layout: {
        type: 'hbox',
        align: 'end'
    },

    items: {
        //edit: null,
        //remove: null,

        geolocate: {
            xtype: 'button',
            iconCls: 'x-fa fa-map-marker',
            handler: 'onGeoLocateTap',
            weight: 10,
            ui: 'flat'
        },

        takePicture: {
            xtype: 'button',
            iconCls: 'x-fa fa-camera',
            handler: 'takePicture',
            weight: 11,
            ui: 'flat'
        }
    }
});

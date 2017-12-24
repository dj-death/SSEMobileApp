Ext.define('App.view.project.ShowHeader', {
    extend: 'App.view.widgets.ShowHeader',
    xtype: 'projectshowheader',

    cls: 'show-header',
    weighted: true,

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    items: {
        title: {
            xtype: 'component',
            userCls: 'header-title',
            flex: 1,
            bind: {
                record: '{record}'
            }
        },

        tools: {
            layout: {
                type: 'hbox',
                align: 'stretchmax',
                pack: 'end'
            },

            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-map-marker',
                handler: 'onGeoLocateTap',
                weight: 10,
                ui: 'flat'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-camera',
                handler: 'takePicture',
                weight: 11,
                ui: 'flat'
            }]

        }
    }
});

Ext.define('App.view.product.ShowHeader', {
    extend: 'Ext.Container',
    xtype: 'productshowheader',

    cls: 'show-header',
    weighted: true,

    layout: {
        type: 'hbox',
        align: 'end'
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
        },

        visit: {
            xtype: 'button',
            iconCls: 'x-fa fa-eye',
            cls: 'no-print',
            handler: 'onVisitTap',
            text: '+ Visiter',
            weight: 9,
            ui: 'flat',

            platformConfig: {
                phone: {
                    hidden: true
                }
            }
        },


        edit: {
            xtype: 'button',
            iconCls: 'x-fa fa-pencil',
            cls: 'no-print',
            handler: 'onEditTap',
            text: 'Modifier',
            weight: 10,
            ui: 'flat',

            platformConfig: {
                phone: {
                    hidden: true
                }
            }
        },

        remove: {
            xtype: 'button',
            iconCls: 'x-fa fa-remove',
            cls: 'no-print',
            handler: 'onDeleteTap',
            text: 'Supprimer',
            weight: 20,
            ui: 'flat',

            platformConfig: {
                phone: {
                    hidden: true
                }
            }
        }
    }
});

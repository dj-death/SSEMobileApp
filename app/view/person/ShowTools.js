Ext.define('App.view.person.ShowTools', {
    extend: 'Ext.Container',
    xtype: 'personshowtools',

    mixins: [
          'Ext.mixin.Responsive'
    ],

    cls: 'person-tools',

    layout: {
        type: 'box',
        align: 'center'
    },

    responsiveConfig: {
        'width < 600': {
            layout: {
                vertical: true
            }
        },
        'width > 599': {
            layout: {
                vertical: false
            }
        }
    },

    items: [{
        xtype: 'toolbar',
        flex: 1,

        items: [{
            iconCls: 'x-fa fa-phone',
            handler: 'onCallTap',
            ui: 'action-phone',
            bind: {
                tooltip: 'Call <b>{record.phone}</b>'
            }
        }, {
            iconCls: 'x-fa fa-envelope',
            handler: 'onEmailTap',
            ui: 'action-email',
            bind: {
                tooltip: 'Send email to <b>{record.email}</b>'
            }
        }]
    }]
});

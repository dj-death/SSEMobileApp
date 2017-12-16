Ext.define('App.view.home.HomeHeader', {
    extend: 'Ext.Container',
    xtype: 'homeheader',

    cls: 'home-header',
    layout: 'vbox',

    items: [{
        xtype: 'component',
        cls: 'header-message',
        tpl: [
            '<div class="text">',
                '<div class="greeting">{greeting}</div>',
                '<div class="person-name">{firstname}</div>',
            '</div>'
        ],
        bind: {
            data: {
                firstname: '{user.firstname}',
                greeting: '{greeting}'
            }
        }
    }, {
        xtype: 'container',
        layout: 'hbox',
        userCls: [
            'page-constrained',
            'header-info'
        ],
        items: [{
            xtype: 'component',
            cls: 'header-clock',
            tpl: [
                '<div class="date">{time:date("l, F d")}</div>',
                '<div class="time"><span class="x-fa fa-clock-o"></span> {time:date("G:ia")}</div>'
            ],
            bind: {
                data: {
                    time: '{time}'
                }
            }
        }]
    }]
});

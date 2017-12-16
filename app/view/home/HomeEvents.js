Ext.define('App.view.home.HomeEvents', {
    extend: 'Ext.Panel',
    xtype: 'homeevents',

    cls: 'home-events',

    tbar: {
        layout: {
            pack: 'center'
        },

        items: [{
            xtype: 'segmentedbutton',
            defaultUI: 'segmented flat',
            bind: '{range}',
            items: [{
                text: 'Prochain',
                value: 'upcoming'
            }, {
                text: 'Récent',
                value: 'recent'
            }, {
                text: 'Passé',
                value: 'past'
            }]
        }]
    },

    items: [{
        xtype: 'dataview',
        bind: '{visits}',
        minHeight: 80,
        inline: true,
        ui: 'light',

        selectable: {
            disabled: true
        },

        itemTpl: [
            '<div class="event-header type-anniversary"> DIDI',
                '<div class="date">{startDate:date("M j")}</div>',
                '<div class="title">Visite {title}</div>',
            '</div>',
            '<div class="event-content">',
                '<div>{title}</div>',
            '</div>'
        ],

        listeners: {
            childtap: 'onEventChildTap'
        }
    }]
});

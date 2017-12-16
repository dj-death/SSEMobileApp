Ext.define('App.view.visit.ShowConclusions', {
    extend: 'Ext.Panel',
    xtype: 'visitshowconclusions',

    cls: 'product-details',
    title: 'Observations',

    tpl: [
        '<div class="block-section full-width">',
            '<div class="item">',
                '<div class="value">{observations}</div>',
            '</div>',
        '</div>'
    ],

    bind: {
        record: '{record}'
    }
});

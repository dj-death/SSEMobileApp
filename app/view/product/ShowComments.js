Ext.define('App.view.product.ShowComments', {
    extend: 'Ext.Panel',
    xtype: 'productshowcomments',

    title: 'Commentaires',

    bind: {
        record: '{record}'
    },

    tpl: [
        '<div class="block-section full-width">',
            '<div class="item">',
                '<div class="value">{comment}</div>',
            '</div>',
        '</div>'
    ]
});

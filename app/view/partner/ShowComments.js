Ext.define('App.view.partner.ShowComments', {
    extend: 'Ext.Panel',
    xtype: 'partnershowcomments',

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

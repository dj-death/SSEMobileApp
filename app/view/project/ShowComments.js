Ext.define('App.view.project.ShowComments', {
    extend: 'Ext.Panel',
    xtype: 'projectshowcomments',

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

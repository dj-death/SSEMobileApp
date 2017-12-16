Ext.define('App.view.project.ShowPictures', {
    extend: 'Ext.Panel',
    xtype: 'projectshowpictures',

    cls: 'organization-people',

    title: 'Images',
    iconCls: 'x-fa fa-picture-o',

    bodyPadding: 15,

    items: [{
        xtype: 'dataview',
        bind: '{images}',
        ui: 'thumbnails',
        minHeight: 120,
        inline: true,
        itemTpl: '<div class="thumbnail" style="margin: 2px 6px 2px 1px; background-image: url(/uploads/{src}), url(images/broken_image.gif)">{title}</div>',

        listeners: {
            childtap: 'onPictureTap'
        }
    }]
});

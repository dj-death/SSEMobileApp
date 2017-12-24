Ext.define('App.view.project.ShowPictures', {
    extend: 'Ext.Panel',
    xtype: 'projectshowpictures',

    cls: 'organization-people',

    title: 'Images',
    iconCls: 'x-fa fa-picture-o',

    bodyPadding: 10,

    items: [{
        xtype: 'dataview',
        bind: '{images}',
        ui: 'thumbnails',
        minHeight: 130,
        inline: true,
        itemTpl: '<div class="thumbnail" style="margin: 2px 6px 2px 1px; background-image: url(http://192.168.1.4/uploads/{src}), url(resources/images/broken_image.gif)">{title}</div>',

        listeners: {
            childtap: 'onPictureTap'
        }
    }]
});

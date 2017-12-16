Ext.define('App.model.risk.Classe', {
    extend: 'App.model.risk.Base',

    entityName: 'Classe',
    idProperty: 'id',
    glyph: 'xf1b2@FontAwesome',

    fields: [{
        name: 'name',
        convert: undefined
    },{
        name: 'iconCls',
        defaultValue: 'x-fa fa-archive'
    }]

});
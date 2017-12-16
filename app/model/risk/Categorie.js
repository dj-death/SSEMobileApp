Ext.define('App.model.risk.Categorie', {
    extend: 'App.model.risk.Base',

    entityName: 'Categorie',
    idProperty: 'id',
    glyph: 'xf0f2@FontAwesome',

    fields: [{
        name: 'name',
        convert: undefined
    },{
        name: 'iconCls',
        defaultValue: 'x-fa fa-suitcase'
    }]
    
});
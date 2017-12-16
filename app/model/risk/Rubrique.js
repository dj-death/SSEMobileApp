Ext.define('App.model.risk.Rubrique', {
    extend: 'App.model.risk.Base',

    entityName: 'Rubrique',
    idProperty: 'id',
    glyph: 'xf07b@FontAwesome',

    fields: [{
        name: 'name',
        convert: undefined
    },{
        name: 'iconCls'
    }]
    
});
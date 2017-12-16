Ext.define('App.model.risk.Risque', {
    extend: 'App.model.risk.Base',

    entityName: 'Risque',
    idProperty: 'id',
    glyph: 'xf071@FontAwesome',

    fields: [{
        name: 'name',
        convert: undefined
    }, {
        name: 'iconCls',
        defaultValue: 'x-fa fa-warning'
    }, {
        name: 'leaf',
        defaultValue: true
    }]
    
});
Ext.define('App.view.pages.Error404', {
    extend: 'App.view.pages.ErrorBase',
    xtype:'page404',

    items:[{
        cls: 'error-page-top-text',
        html: '404'
    },{
        cls: 'error-page-desc',
        html: '<p>Attention, cette page n\'existe pas !</p><p>Retour à la  ' +
        '<a href="#home"> Page d\'accueil </a></p>'
    }]
});

Ext.define('App.view.pages.Error403', {
    extend: 'App.view.pages.ErrorBase',
    xtype:'page403',

    items:[{
        cls: 'error-page-top-text',
        html: '403'
    },{
        cls: 'error-page-desc',
        html: "<p>Désolé, votre demande ne peut pas etre traitée.<br/>Vous ne possédez pas les autorisations d'accès suffisantes !</p>"+
        "<p>Revenir à la <a href='#home'> page d'accueil </a></p>"
    }]
});

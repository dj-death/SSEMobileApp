Ext.define('App.view.project.ShowPorteur', {
    extend: 'Ext.Panel',
    xtype: 'projectshowporteur',

    iconCls: 'x-fa fa-user-o',
    title: 'Porteur du projet',

    bind: {
        record: '{record}'
    },

    tpl: [
        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Dénomination</div>',
                '<div class="value">{porteur_ajuste}</div>',
            '</div>',
            '<div class="item">',
                '<div class="label">Classe</div>',
                '<div class="value">{classe_porteur}</div>',
            '</div>',
            '<div class="item">',
                '<div class="label">Type</div>',
                '<div class="value">{type_porteur}</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Date de Création</div>',
                '<div class="value">{date_creation_porteur}</div>',
            '</div>',
            '<div class="item">',
                '<div class="label">Nombre de projets INDH</div>',
                '<div class="value">{nombre_projets_porteur}</div>',
            '</div>',
        '</div>'
    ]
});

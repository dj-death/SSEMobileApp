Ext.define('App.view.person.ShowDetails', {
    extend: 'Ext.Panel',
    xtype: 'personshowdetails',

    cls: 'person-details',
    title: 'Détails',

    bind: {
        record: '{record}'
    },

    tpl: [
        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Nom utilisateur</div>',
                '<div class="value">{username}</div>',
            '</div>',
            '<div class="item">',
                '<div class="label">Programme géré</div>',
                '<div class="value">{programme}</div>',
            '</div>',

            '<tpl if="phone">',
                '<div class="item">',
                    '<div class="label">N° tél.</div>',
                    '<div class="value">{phone}</div>',
                '</div>',
            '</tpl>',
            '<tpl if="extension">',
                '<div class="item">',
                    '<div class="label">N° tél. 2</div>',
                    '<div class="value">{extension}</div>',
                '</div>',
            '</tpl>',
        '</div>',
        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">E-mail</div>',
                '<div class="value">{email}</div>',
            '</div>',
        '</div>'
    ]
});

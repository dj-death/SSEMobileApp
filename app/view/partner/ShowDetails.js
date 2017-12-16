Ext.define('App.view.partner.ShowDetails', {
    extend: 'Ext.Panel',
    xtype: 'partnershowdetails',

    title: 'Détails',

    bind: {
        record: '{record}'
    },

    tpl: [
        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Code DAI</div>',
                '<div class="value">{code_DAI}</div>',
            '</div>',
            '<div class="item">',
                '<div class="label">Date de création</div>',
                '<div class="value">{date_creation:date("d M Y")}</div>',
                '<div class="extra">{date_creation:dateDiff(new Date())}</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Statut juridique</div>',
                '<div class="value">{statut_juridique}</div>',
            '</div>',
            
            '<div class="item">',
                '<div class="label">Domaine d\'activité</div>',
                '<div class="value">{domaine}</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Localisation</div>',
                '<div class="value">{commune}</div>',
                '<div class="extra">{address}</div>',
            '</div>',

            '<tpl if="phone">',
                '<div class="item">',
                    '<div class="label">Téléphone</div>',
                    '<div class="value">{phone}</div>',
                '</div>',
            '</tpl>',
            '<tpl if="email">',
                '<div class="item">',
                    '<div class="label">E-mail</div>',
                    '<div class="value">{email}</div>',
                '</div>',
            '</tpl>',
            '<tpl if="website">',
                '<div class="item">',
                    '<div class="label">Site Web</div>',
                    '<div class="value"><a href="{website}" target="_blank">{website}</a></div>',
                '</div>',
            '</tpl>',

        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Projets INDH</div>',
                '<div class="value">{projectscount:plural("projet")}</div>',
                '<div class="extra">{INDH_contributions:dhMoney}</div>',
            '</div>',
        '</div>'
    ]
});
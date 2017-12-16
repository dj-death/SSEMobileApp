Ext.define('App.view.partner.ShowGovernement', {
    extend: 'Ext.Panel',
    xtype: 'partnershowgovernement',

    title: 'Cadre règlementaire et gouvernance',
    iconCls: 'x-fa fa-university',

    bind: {
        record: '{record}'
    },

    tpl: [
        '<div class="block-section full-width">',
            '<div class="item">',
                '<div class="label">Date dernière A.G</div>',
                '<div class="value">{date_derniere_AG:date("d M Y")}</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="value">{has_dossier_reglementaire:pick("  &nbsp; &nbsp;", \'<span class="x-fa fa-check"></span>\')} Dossier règlementaire</div>',
            '</div>',

            '<div class="item">',
                '<div class="value">{does_respect_tenue_AG:pick("  &nbsp; &nbsp;", \'<span class="x-fa fa-check"></span>\')} Tenue des A.Gs</div>',
            '</div>',

            '<div class="item">',
                '<div class="value">{has_rapports:pick("  &nbsp; &nbsp;", \'<span class="x-fa fa-check"></span>\')} Elaboration des rapports et PVs</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="value">{has_elaboration_bilan:pick("  &nbsp; &nbsp;", \'<span class="x-fa fa-check"></span>\')} Elaboration des bilans</div>',
            '</div>',
            '<div class="item">',
                '<div class="value">{has_certification_comptes:pick("  &nbsp; &nbsp;", \'<span class="x-fa fa-check"></span>\')} Certification des comptes</div>',
            '</div>',
            '<div class="item">',
                '<div class="value">{has_qualite_systeme_gestion:pick("  &nbsp; &nbsp;", \'<span class="x-fa fa-check"></span>\')} Qualité du système de gestion</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="value">{has_accompagnement_formation:pick("  &nbsp; &nbsp;", \'<span class="x-fa fa-check"></span>\')} Accompagement et formation</div>',
            '</div>',
            '<div class="item">',
                '<div class="value">{has_disponibilite_moyens:pick("  &nbsp; &nbsp;", \'<span class="x-fa fa-check"></span>\')} Disponibilité des moyens</div>',
            '</div>',
        '</div>',

        '<div class="block-section">',
            '<div class="item">',
                '<div class="label">Siège de l\'entité</div>',
                '<div class="value">{type_siege}</div>',
            '</div>',
        '</div>'
    ]
});
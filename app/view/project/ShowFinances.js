Ext.define('App.view.project.ShowFinances', {
    extend: 'Ext.Panel',
    xtype: 'projectshowfinances',

    cls: 'project-finances',
    iconCls: 'x-fa fa-money',

    title: 'Montage Financier',

    minHeight: 320,
    bodyPadding: 15,

    layout: 'fit',

    items: [{
        xtype: 'component',
        cls: 'project-details',

        bind: {
            record: '{record}'
        },

        tpl: [
            '<div class="block-section">',
                '<div class="item">',
                    '<div class="label">Coût global</div>',
                    '<div class="value">{montant_global:dhMoney}</div>',
                '</div>',
                '<div class="item">',
                    '<div class="label">Part INDH</div>',
                    '<div class="value">{part_INDH:dhMoney}</div>',
                '</div>',
                '<div class="item">',
                    '<div class="label">Effet de Levier</div>',
                    '<div class="value">{participation_partenaires:dhMoney}</div>',
                '</div>',

                '<div class="item">',
                    '<div class="label">Taux d\'émission</div>',
                    '<div class="value">{tx_avancement_financier} %</div>',
                '</div>',
            '</div>'
        ] 
    }]
});

Ext.define('App.view.project.ShowFinances', {
    extend: 'Ext.Panel',
    xtype: 'projectshowfinances',

    requires: [
        'Ext.chart.PolarChart',
        'Ext.chart.series.Pie',
        'Ext.chart.interactions.Rotate',
        'Ext.chart.axis.Category',
        'Ext.chart.interactions.ItemHighlight'
    ],

    cls: 'project-finances',
    iconCls: 'x-fa fa-money',

    title: 'Montage Financier',

    minHeight: 320,
    bodyPadding: 15,

    layout: 'hbox',

    items: [{
        xtype: 'component',
        cls: 'project-details',

        flex: 2,

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
    },{
        xtype: 'container',
        flex: 3,

        layout: 'vbox',

        items: [{
            xtype: 'polar',
            reference: 'financePieChart',
            flex: 1,
            insetPadding: '4 8 7 0',
            innerPadding: 2,
            bind: '{finances}',

            series: [{
                type: 'pie',
                animation: {
                    easing: 'easeOut',
                    duration: 500
                },
                useDarkerStrokeColor: false,
                xField: 'contribution',
                clockwise: false,
                highlight: {
                    margin: 10
                },
                style: {
                    strokeStyle: 'white',
                    lineWidth: 1
                },
                padding: 0,
                legend: {
                    type: 'sprite',
                    docked: 'right',
                    marker: {
                        size: 16
                    }
                },
                label: {
                    field: 'partner',
                    display: 'inside',
                    contrast: true,
                    font: '12px Arial'
                },
                tooltip: {
                    trackMouse: true,
                    renderer: 'onFinancesChartTooltipRender'
                }
            }],

            interactions: ['rotate', 'itemhighlight']
        }, {
            xtype: 'cartesian',
            flex: 1,
            reference: 'engagementChart',
            flipXY: true,
            bind: '{engagements}',

            axes: [{
                type: 'category',
                position: 'left',
                fields: 'phase'
            }],

            series: [{
                type: 'bar',
                xField: 'phase',
                yField: 'amount',

                renderer: function(sprite, record, attributes, index, store) {
                    var colors = ['#257c80', '#39babf', '#757575'];

                    attributes.fill = colors[index%colors.length];

                    return attributes;
                },

                label: {
                    field: 'amount',
                    display: 'inside',
                    contrast: true,
                    font: '12px Arial'
                },

                tooltip: {
                    trackMouse: true,
                    renderer: 'onEngagementChartTooltipRender'
                },

                style: {
                    opacity: 0.80
                }
            }]
        }]
    }]
});

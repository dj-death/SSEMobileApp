Ext.define('App.view.partner.ShowFinances', {
    extend: 'Ext.Panel',
    xtype: 'partnershowfinances',

    requires: [
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],

    title: 'Finances',
    iconCls: 'x-fa fa-money',

    minHeight: 500,
    bodyPadding: 15,

    layout: 'fit',

    items: [{
        xtype: 'tabpanel',

        defaults: {
            scrollable: true,
            userSelectable: {
                bodyElement: true
            }
        },

        items: [{
            title: 'Chiffre d\'affaires',
            layout: 'fit',
            items: [{
                xtype: 'cartesian',
                bind: '{finances}',
                insetPadding: '20 20 10 0',
                innerPadding: '10 20',

                legend: {
                    type: 'sprite'
                },

                axes: [{
                    type: 'numeric',
                    fields: ['CA_reel', 'CA_prevu'],
                    position: 'left',
                    reconcileRange: true,
                    grid: true,
                    minimum: 0,
                    renderer: 'onAxisLabelMoneyRender',
                    title: 'Ventes'
                }, {
                    type: 'category',
                    fields: 'exercice',
                    position: 'bottom',
                    grid: true,
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }],

                series: [{
                    type: 'line',
                    title: 'CA réel',
                    xField: 'exercice',
                    yField: 'CA_reel',
                    smooth: true,
                    marker: {
                        animation: {
                            duration: 200
                        },
                        radius: 4
                    },
                    label: {
                        field: 'CA_reel',
                        display: 'over'
                    },

                    style: {
                        lineWidth: 2,
                        opacity: 0.80
                    },

                    highlight: true,

                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: 'onLineSeriesTooltipRender'
                    }
                }, {
                    type: 'line',
                    title: 'CA prévu',
                    xField: 'exercice',
                    yField: 'CA_prevu',
                    highlight: true,
                    smooth: true,
                    marker: {
                        animation: {
                            duration: 200
                        },
                        radius: 4
                    },
                    label: {
                        field: 'CA_prevu',
                        display: 'over'
                    },

                    style: {
                        lineWidth: 2,
                        opacity: 0.80
                    },

                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: 'onLineSeriesTooltipRender'
                    }
                }]
            }]
        }, {
            title: 'Résultat Net',
            layout: 'fit',
            items: [{
                xtype: 'cartesian',
                bind: '{finances}',
                insetPadding: '20 20 10 0',
                innerPadding: '10 20',

                legend: {
                    type: 'sprite'
                },

                axes: [{
                    type: 'numeric',
                    fields: ['resultat_net_reel', 'resultat_net_reel'],
                    position: 'left',
                    reconcileRange: true,
                    grid: true,
                    minimum: 0,
                    renderer: 'onAxisLabelMoneyRender',
                    title: 'Résultat Net'
                }, {
                    type: 'category',
                    fields: 'exercice',
                    position: 'bottom',
                    grid: true,
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }],

                series: [{
                    type: 'line',
                    title: 'Résultat net réel',
                    xField: 'exercice',
                    yField: 'resultat_net_reel',
                    smooth: true,
                    marker: {
                        animation: {
                            duration: 200
                        },
                        radius: 4
                    },
                    label: {
                        field: 'resultat_net_reel',
                        display: 'over'
                    },

                    style: {
                        lineWidth: 2,
                        opacity: 0.80
                    },

                    highlight: true,

                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: 'onLineSeriesTooltipRender'
                    }
                }, {
                    type: 'line',
                    title: 'Résultat net prévu',
                    xField: 'exercice',
                    yField: 'resultat_net_prevu',
                    highlight: true,
                    smooth: true,
                    marker: {
                        animation: {
                            duration: 200
                        },
                        radius: 4
                    },
                    label: {
                        field: 'resultat_net_prevu',
                        display: 'over'
                    },

                    style: {
                        lineWidth: 2,
                        opacity: 0.80
                    },

                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: 'onLineSeriesTooltipRender'
                    }
                }]
            }]
        }, {
            title: 'Dépenses & Recettes',
            layout: 'fit',
            items: [{
                xtype: 'cartesian',
                bind: '{finances}',
                insetPadding: '20 10',
                innerPadding: '10 20',

                legend: {
                    type: 'sprite'
                },

                axes: [{
                    type: 'numeric',
                    fields: ['total_depenses', 'total_recettes', 'solde'],
                    position: 'left',
                    grid: true,
                    minimum: 0,
                    renderer: 'onAxisLabelMoneyRender',
                    title: 'Recettes/Dépenses'
                }, {
                    type: 'category',
                    fields: 'exercice',
                    position: 'bottom',
                    grid: true,
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }],

                series: [{
                    type: 'bar',
                    title: 'Dépenses',
                    xField: 'exercice',
                    yField: 'total_depenses',

                    style: {
                        minGapWidth: 5
                    },

                    highlight: {
                        strokeStyle: 'black',
                        fillStyle: '#c1e30d',
                        lineDash: [5, 3]
                    },

                    label: {
                        field: 'total_depenses',
                        display: 'insideStart'
                    },

                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: 'onLineSeriesTooltipRender'
                    }
                }, {
                    type: 'bar',
                    title: 'Recettes',
                    xField: 'exercice',
                    yField: 'total_recettes',
                    style: {
                        minGapWidth: 5
                    },
                    
                    highlight: {
                        strokeStyle: 'black',
                        fillStyle: '#c1e30d',
                        lineDash: [5, 3]
                    },

                    label: {
                        field: 'total_recettes',
                        display: 'outside',

                        style: {
                            textAlign: 'center',
                            textBaseline: 'middle'
                        }
                    },

                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: 'onLineSeriesTooltipRender'
                    }
                }, {
                    type: 'line',
                    title: 'Solde fin période',
                    xField: 'exercice',
                    yField: 'solde',
                    highlight: true,
                    smooth: true,
                    marker: {
                        animation: {
                            duration: 200
                        },
                        radius: 4
                    },
                    label: {
                        field: 'solde',
                        display: 'over'
                    },

                    style: {
                        lineWidth: 2,
                        opacity: 0.80
                    },

                    tooltip: {
                        trackMouse: true,
                        showDelay: 0,
                        dismissDelay: 0,
                        hideDelay: 0,
                        renderer: 'onLineSeriesTooltipRender'
                    }
                }]
            }]
        }, {
            title: 'Actif',
            layout: 'fit',
            items: [{
                xtype: 'cartesian',
                shadow: 'true',
                insetPadding: '10 40 0 10',
                innerPadding: '10 20',

                bind: '{finances}',

                legend: true,

                series: [{
                    type: 'bar',
                    xField: ['exercice'],

                    yField: ['immobilisations', 'creances', 'stocks', 'tresorerie'],
                    title: ['immobilisations', 'créances', 'stocks', 'trésorerie'],

                    stacked: false,
                    highlight: true,

                    label: {
                        field: ['immobilisations', 'creances', 'stocks', 'tresorerie'],
                        display: 'insideEnd'
                    }
                }],

                axes: [{
                    type: 'numeric',
                    fields: ['immobilisations', 'creances', 'stocks', 'tresorerie'],
                    position: 'left',
                    grid: true,
                    reconcileRange: true,
                    minimum: 0,
                    renderer: 'onAxisLabelMoneyRender'
                }, {
                    type: 'category',
                    fields: 'exercice',
                    position: 'bottom',
                    grid: true,
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }]

            }]
            
        }, {
            title: 'Passif',
            layout: 'fit',
            items: [{
                xtype: 'cartesian',
                shadow: 'true',
                insetPadding: '10 40 0 10',
                innerPadding: '10 20',

                bind: '{finances}',

                legend: true,

                label: {
                    field: ['capitaux_propres', 'total_subventions', 'dettes_MLT', 'dettes_CT'],
                    display: 'insideEnd'
                },

                series: [{
                    type: 'bar',
                    xField: 'exercice',

                    yField: ['capitaux_propres', 'total_subventions', 'dettes_MLT', 'dettes_CT'],
                    title: ['capitaux propres', 'subventions', 'dettes MLT', 'dettes CT'],
                    stacked: false
                }],

                axes: [{
                    type: 'numeric',
                    fields: ['capitaux_propres', 'total_subventions', 'dettes_MLT', 'dettes_CT'],
                    position: 'left',
                    grid: true,
                    reconcileRange: true,
                    minimum: 0,
                    renderer: 'onAxisLabelMoneyRender'
                }, {
                    type: 'category',
                    fields: 'exercice',
                    position: 'bottom',
                    grid: true,
                    label: {
                        rotate: {
                            degrees: -45
                        }
                    }
                }]

            }]
            
        }]
    }]

});

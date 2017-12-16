Ext.define('App.view.project.RowViewModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.projectbrowse-rowViewModel',

    formulas: {
        statutCls: function (get) {
            var statut = get('record.statut');

            statut = statut && statut.toLowerCase().trim();

            switch (statut) {
                case 'non démarré':
                    return 0;
                    
                case 'non initié':
                case 'en cours d\'étude':
                    return 1;
                    
                case 'en cours de lancement':
                    return 2;

                case 'en cours d\'execution':
                case 'en cours d\'exécution':
                    return 3;

                case 'en retard d\'exécution':
                    return 4;

                case 'achevé (considéré non opérationnel)':
                    return 5;

                case 'opérationnel':
                    return 6;

                case 'en difficulté':
                    return 7;

    
                case 'en arrêt':
                case 'en arrêt d\'activité':
                case 'en souffrance':
                case 'projet mort':
                    return 8;

                
                case 'en cours d\'annulation':
                case 'en cours de résiliation':
                case 'résilié':
                    return 9;

                case 'annulé':
                    return 10;

                default:
                    console.log('Statut non identifié :', statut);
                    return;
            }

        }
    }
});
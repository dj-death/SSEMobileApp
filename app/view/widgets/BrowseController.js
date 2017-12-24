Ext.define('App.view.widgets.BrowseController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.browse',
    
    uses: ['App.util.String'],


    control: {
        '#': {
            routechange: 'onRouteChange',
            storechange: 'onStoreChange'
        }
    },

    firstTime: true,
    
    init: function () {
        this.callParent(arguments);

        var me = this;

        Ext.defer(function () {
            me.firstTime = false;

        }, 3000, me)
    },

    onFilterTap: function () {
        var view = this.getView(),
            tbar = view.getTbar();

        if (tbar.isVisible()) {
            tbar.hide();
        } else {
            tbar.show();
        }
    },

    onStoreFiltered: function ( store, filters, eOpts ) {
        if (this.firstTime) { // as we begin with filters
            return;
        }

        console.log(filters);

        /*var item = filters.first();
        
        alert(item.getValue());*/

        this.onFilterTap();
    },
	

    initViewModel: function(vm) {
        vm.bind(
            { bindTo: '{filters}', deep: true },
            Ext.Function.createBuffered(function() {
                if (!this.destroyed) {
                    // The view might have been destroyed (e.g. user deauthentication)
                    this.updateFilters()
                }
            }, 500, this, {}));
    },

    onRecordDataChanged: function () {
        var store = this.getStore();

        store.reload();
    },

    getStore: function () {
        var view = this.getView(),
            store = view.getStore();

        return store;
    },


    onStoreRefresh: function (store) {
        var vm = this.getViewModel();

        vm.set('count', store.count());
    },

    updateFilters: function(reload) {
        var view = this.getView(),
            store = this.getStore(),
            vm = this.getViewModel(),
            collection = store && store.getFilters(),
            filters = vm.get('filters'),
            fields = view.getFields(),
            dirty = !!reload,
            item, value;
            

        if (!collection) {
            return;
        }

        if (filters) {
            if (typeof filters['search'] === 'string' && filters['search'].length <= 3 && filters['search'].length > 0) {
                return;
            }
        }

        Ext.Object.each(fields, function(key, field) {
            value = filters[key];
            if (value && value.isModel) {
                value = value.get('value');
            }

            key = field.property || key;
            item = collection.get(key);
            
            if ((item && item.getValue()) == value) {
                return;
            }

            dirty = true;

            if (value == null) {
                store.removeFilter(key, true);
            } else {
                store.filter(key, value, true);
            }
        });

        if (dirty) {
            store.removeAll();
            store.load();
        }
        
    },

    onRouteChange: function(view, route) {            
        var me = this,
            vm = me.getViewModel(),
            regex = /([^\/]+)\/([^\/]+)/g,
            fields = me.getView().getFields() || {},
            filters = {},
            field, value;
        
        Ext.Object.each(fields, function(key, value) {
            filters[key] = typeof value.defaultValue !== 'undefined' ?  value.defaultValue : null;
        });

        while (match = regex.exec(route)) {
            field = match[1];
            value = match[2];

            if (Ext.isDefined(filters[field])) {
                filters[field] = field !== 'search'?
                    Ext.create(App.model.Filter, { value: value }) :
                    value;
            }
        }

        vm.set('filters', filters);
    },

    onStoreChange: function() {
        this.updateFilters(true);
    },


    onChildActivate: function(dataview, location) {
        var record = location.record;
        if (record) {
            this.redirectTo(record);
        }
    },

    onEditAction: function(list, data) {
        this.redirectTo(data.record.toEditUrl());
    },

    onRefresh: function () {

    },

    onRefreshTap: function() {
        var store = this.getStore();
        if (store) {
            store.reload();
        }
    },

    onClearFiltersTap: function() {
        this.getViewModel().set('filters', {});
    },


    onToggleGroupTap: function () {
        var grid = this.getView().down('grid'),
            isGrouped = grid.getGrouped(),
            vm = this.getViewModel();

        grid.setGrouped(!isGrouped);

        if (vm) {
            vm.set({
                toogleGroupIconCls: isGrouped ? 'fa fa-object-group' : 'fa fa-object-ungroup'
            });
        }
    },

    _endRec: function () {
        var speechRecognition = window.plugins && window.plugins.speechRecognition;
		
        if (!speechRecognition) {
            return;
        }

        speechRecognition.stopListening && speechRecognition.stopListening();
    },

    _startRec: function () {
        var speechRecognition = window.plugins && window.plugins.speechRecognition;
		
        if (!speechRecognition) {
            return;
        }

        var artyom = new Artyom();

        artyom.addCommands([
            {
                // a Smart command allow you to use wildcard in order to retrieve words that the user should say
                smart: true, 

                // Ways to trigger the command with the voice
                indexes:["Do you know who is *","I don't know who is *","Is * a good person"],

                action: function (i,wildcard) {
                    var database = ["Carlos","Bruce","David","Joseph","Kenny"];
        
                    //If the command "is xxx a good person" is triggered do, else
                    if(i == 2){
                        if(database.indexOf(wildcard.trim())){
                            artyom.say("I'm a machine, I dont know what is a feeling");
                        }else{
                            artyom.say("I don't know who is " + wildcard + " and i cannot say if is a good person");
                        }
                    } else{
                        if(database.indexOf(wildcard.trim())){
                            artyom.say("Of course i know who is "+ wildcard + ". A really good person");
                        }else{
                            artyom.say("My database is not big enough, I don't know who is " + wildcard);
                        }
                    }
                }
            },
            {
                indexes: ["Translate * in Spanish"],
                smart: true,
                action: function(i, wildcard){
                    alert("I cannot translate" + wildcard);
                }
            },
        ]);

        function showMsgBox (msg) {
            //navigator.notification.beep(2);
            navigator.notification.activityStart(msg, "Opération en cours");

            Ext.defer(function () {
                navigator.notification.activityStop();
            }, 1000, me);
        }

        var me = this,
            vm = this.getViewModel(),
            view = this.getView();

        var dictionary = App.app.getPredictsStore();

        // Handle results
        function startRecognition() {
           

            window.plugins.speechRecognition.startListening(function(result){
                // The hello command should be triggered
                result.forEach(function(option){
                    if (artyom.simulateInstruction(option)){
                        console.log("Matched : " + option, result);
                        return;
                    }
                });

                // Show results in the console
                var transcript = result[0].toLowerCase().trim();

                if (transcript.endsWith("nouvelle recherche") || transcript.endsWith("بحث جديد")) {
                    
                    navigator.notification.beep(1);
                    navigator.notification.activityStart("Nouvelle Recherche", "");

                    me.onClearFiltersTap();
                    me._endRec();
                    Ext.defer(function () {
                        navigator.notification.activityStop();
                        me._startRec();
                    }, 2000, me);
                    return;
                }

                if (transcript.endsWith("stop") || transcript.endsWith("قف")) {
                    navigator.notification.beep(1);
                    showMsgBox('Stop');

                    me._endRec();
                    return ;
                }

                transcript = transcript.replace(/comme une/, 'commune');
                transcript = transcript.replace(/exercice/, 'annee');
                transcript = transcript.replace(/sous\-secteur/, 'soussecteur');
            

                var filters = vm.get('filters'),
                    regex = transcript.match(/(commune|quartier|douar|année|annee|programme|secteur|soussecteur) (.+)/),
                    field = regex && regex[1] && regex[1].replace(/é|è/ig, 'e'),
                    value = regex && regex[2].trim();

                if (regex && field && filters.hasOwnProperty(field)) {
                    value = value.toLowerCase();

                    // as they probably not found cuz it's arabic
                    if (field === 'commune' || field === 'quartier') {
                        value = App.util.String.stripAccents(value);
                    }

                    if (value === 'tout' || value === 'tous' || value === 'toutes') {
                        value = null;
                        filters[field] = item;

                        showMsgBox('Annuler Filtre par ' + field);

                    } else {

                        if (field === 'annee') {
                            value = parseInt(value);
                        }

                        var store = vm.getStore(field + 's'),
                            item = store && store.findRecord('value', value, 0, true);

                        if (item) {
                            filters[field] = item;

                            var msg = 'Filtrer par ' + field + ' = ' + filters[field].get('value');

                            showMsgBox(msg);
                            
                        } else {
                            
                            dictionary.filter('category', field);

                            var match = dictionary.findRecord('sentence', value, 0, true);
                            var predict = match && match.get('predict');

                            if(!predict) {

                                function onPrompt (results) {
                                    var buttonId = results.buttonIndex,
                                        value = results.input1;
  
                                    if (buttonId != 1) {
                                        return false;
                                    }

                                    userValue = userValue.replace(field + ' ', '').trim();
            
                                    if (!userValue) {
                                        return;
                                    }
            
                                    var newPredict = Ext.create('App.model.Predict', {
                                        'categorie': field,
                                        'sentence': value,  
                                        'predict': userValue
                                    });
            
                                    newPredict.save();

                                    value = userValue;
                                    
                                    var store = vm.getStore(field + 's'),
                                        item = store && store.findRecord('value', value, 0, true);
            
                                    if (item) {
                                        filters[field] = item;

                                        var msg = 'Filtrer par ' + field + ' = ' + filters[field].get('value');
                                         
                                        showMsgBox(msg);                                    
                                    }

                                    vm.set('filters', filters);
                                    me._endRec();
                                }

                                navigator.notification.prompt(
                                    'Que voulez-vous dire',  // message
                                    onPrompt,                  // callback to invoke
                                    'Mot incompréhensible',            // title
                                    ['Ok','Exit'],             // buttonLabels
                                    field + ' '                 // defaultText
                                );


                            } else {
                                console.log('found :', predict);
                                value = predict;

                                var store = vm.getStore(field + 's'),
                                    item = store && store.findRecord('value', value, 0, true);

                                filters[field] = item;

                                var msg = 'Filtrer par ' + field + ' = ' + filters[field].get('value');

                                showMsgBox(msg);
                            }
                        }

                    }
                    
                } else {
                    filters['search'] = transcript;

                    showMsgBox('Rechercher : ' + transcript);
                }

                vm.set('filters', filters);

                me._endRec();

            }, function(err){
                console.error(err);
                showMsgBox("Reconnaissance Vocale n'a pas pu démarré");
            }, {
                language: "fr-FR",
                showPopup: true,
                matches: 5,
                showPartial: true
            });
        }

        // Verify if recognition is available
        window.plugins.speechRecognition.isRecognitionAvailable(function(available){
            if(!available){
                showMsgBox("Reconnaissance Vocale n'est pas disponible");
            }

            // Check if has permission to use the microphone
            window.plugins.speechRecognition.hasPermission(function (isGranted){
                if(isGranted){
                    startRecognition();
                }else{
                    // Request the permission
                    window.plugins.speechRecognition.requestPermission(function (){
                        // Request accepted, start recognition
                        startRecognition();
                    }, function (err){
                        console.log(err);
                        showMsgBox("Reconnaissance Vocale n'a pas pu démarré");
                    });
                }
            }, function(err){
                console.log(err);
                showMsgBox("Reconnaissance Vocale n'a pas pu démarré");
            });
        }, function(err){
            console.log(err);
            showMsgBox("Reconnaissance Vocale n'a pas pu démarré");
        });

    },

    onSpeech: function (btn) {
        this._startRec();

        /*this.btn = btn;

        if (btn.isPressed()) {
            this._startRec();

        } else {
            this._endRec();
        }*/

    }
});

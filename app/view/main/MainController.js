Ext.define('App.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routes: {
        ':type(/:args)?': {
            before  : 'checkHasPermission',
            action: 'handleNavigationRoute',
            conditions: {
                // NOTE(SB): how to build this list automatically from the Menu store?
                ':type': '(page404|page403|history|home|offices|organizations|people|users|partners|projects|products|missions|visits|risks|stats|recommandations)',
                ':args': '(.*)'
            }
        },

        ':type/:id(/:args)?': {
            //before  : 'checkHasPermission', BUG
            action: 'handleDataRoute',
            conditions: {
                ':type': '(office|organization|person|partner|user|product|mission|visit|risk)',
                ':id': '([a-f0-9-]{36}|create|edit|manage)',
                ':args': '(.*)'
            }
        },
        'project/:id(/:args)?': {
            action: 'handleProjectDataRoute',
            conditions: {
                ':id': '([0-9-]{4,}|edit)',
                ':args': '(.*)'
            }
        }
    },

    listen: {
        global: {
            togglemainmenu: 'onToggleMainMenu',
            navigationback: 'onNavigationBack'
        }
    },

    /**
     * @param {String} ref Component reference, MUST be valid.
     * @protected
     */
    activate: function(ref) {
        var view = ref.isComponent ? ref : this.lookup(ref),
            child = view,
            parent;

        while (parent = child.getParent()) {
            parent.setActiveItem(child);
            child = parent;
        }

        return view;
    },

    getContainerForViewId: function() {
        return this.getView();
    },

    ensureView: function(id, config, route) {
        var container = this.getContainerForViewId(id),
            item = container.child('component[viewId=' + id + ']'),
            reset = !!item;

        if (!item) {
            item = container.add(Ext.apply({ viewId: id }, config));
        }

        if (Ext.isDefined(item.config.route)) {
            item.setRoute(route);
        }

        // Reset the component (form?) only if previously instantiated (i.e. with outdated data).
        if (reset && Ext.isFunction(item.reset)) {
            item.reset();
        }

        return item;
    },

    checkHasPermission: function(type, args, param2, action) {
        var store = Ext.getStore('Menu'),
            entry,
            user = this.getViewModel().get('user'),
            role = user.get('role');

        if (args && args.length) {
            switch (type) {
                case 'person':
                    entry = store.getById('people');
                    break;

                default:
                    entry = store.getById(type + 's');
            }

        } else {
            entry = store.getById(type);
        }

        // not permitted
        if (!entry || entry.get('role') < role) {
            action.stop(true);

            this.activate(
            this.ensureView(type, {
                xtype: 'page403',
                title: "Vous n'etes pas autorisé !"
            }, args));

        } else {
            action.resume();
        }

    },


    handleRiskEditRoute: function () {

    },

    handleNavigationRoute: function(type, args) {
        var store = Ext.getStore('Menu'),
            entry = store.getById(type),
            view,
            title;


        this.lookup('mainmenu').setSelection(entry);

        if (!entry) {
            view = 'page500';
            title = 'Erreur';

        } else {
            view = entry.get('xtype');
            title = entry.get('text');
        }

        this.activate(
            this.ensureView(type, {
                xtype: view,
                title: title
            }, args));
    },


    handleProjectDataRoute: function(id, args) {
        this.handleDataRoute('project', id, args);
    },

    handleDataRoute: function(type, id, args) {
        var me = this,
            args = Ext.Array.clean((args || '').split('/')),
            Model = App.model[Ext.String.capitalize(type)],
            action, xtype, view,

            store = Ext.getStore('Menu'), entry,
            user = me.getViewModel().get('user'),
            role = user.get('role');

        // determine the requested action for the given "type":
        // - #{type}/create: create a new "type"
        // - #{type}/{id}: show record with "id"
        // - #{type}/{id}/edit: edit record with "id"


        switch (type) {
            case 'person':
                entry = store.getById('people');
                break;

            default:
                entry = store.getById(type + 's');
        }

        if (type !== 'person') {
            if (id == 'create' || id == 'manage' || args[0] == 'edit') {
                if (role > 2) {
                    view = me.ensureView('page403', { xtype: 'page403' });
                    me.activate(view);

                    return;
                }

            } else if (!entry || entry.get('role') < role) {
                view = me.ensureView('page403', { xtype: 'page403' });
                me.activate(view);
                return;
            }

        } else {

            if (role > 2 || ( args[0] == 'edit' && (role > 0 && id !== user.getId())) ) {
                view = me.ensureView('page403', { xtype: 'page403' });
                me.activate(view);
                return;
            }
        }

            
        if (id == 'create') {
            action = 'create';
            id = null;
        } else if (id == 'manage') {
            action = 'manage';
        } else if (args[0] == 'edit') {
            action = 'edit';
            args.shift();
        } else {
            action = 'show';
        }


        xtype = type + action;

        // leave a developer message in case of new types addition
        if (!Ext.ClassManager.getNameByAlias('widget.' + xtype)) {
            Ext.log.error('Invalid route: no view for xtype: ' + xtype);
        }

        view = me.ensureView(xtype, { xtype: xtype });

        if (xtype === 'riskmanage') {
            me.activate(view);
            return;
        }

        if (id == null) {
            var record;

            if (args.length >= 2) {
                var key = args[0],
                    user = this.getViewModel().get('user'),
                    data = {};
                    
                data[key] = args[1];
                data["assignee_id"] = user.getId();


                record = new Model(data);

            } else {
                record = new Model();
            }

            view.setRecord(record);

            me.activate(view);
            return;
        }

        Ext.Viewport.setMasked({ xtype: 'loadmask' });

        Model.load(id, {
            callback: function(record) {
                view.setRecord(record);
                me.activate(view);
                
                Ext.Viewport.setMasked(false);
            }
        });

    },

    onToggleMainMenu: function(expanded) {
        var menu = this.lookup('mainmenu');
        if (expanded === undefined) {
            expanded = !menu.getExpanded();
        }

        menu.setExpanded(expanded);
    },

    onNavigationBack: function() {
        Ext.util.History.back();
    }
});

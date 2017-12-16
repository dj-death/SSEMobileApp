Ext.define('App.view.widgets.WizardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wizard',

    requires: [
        'Ext.History',
        'Ext.ComponentQuery'
    ],

    type: null,

    control: {
        '#': {
            //recordchange: 'onRecordChange'
            reset: 'reset'
        }
    },

    reset: function () {
     
    },

    onShow: function(view, record) {
        var view = this.getView();

        if (!view.destroyed) {
            this.goToFirstScreen();
        }
    },


    /*onRecordChange: function(view, record) {
        this.getViewModel().set('record', record);

        // Scroll to the top of the view but make sure that the view is still
        // valid since the record is reset to null when the view is destroyed.
        if (!view.destroyed) {
            this.goToFirstScreen();
        }
    },*/

    init: function () {
        this.callParent(arguments);
        
        var me = this,
            vm = this.getViewModel(),
            hash = location.hash.slice(1).split('/')[0],
            newHash = hash[hash.length - 1] === 's' ? hash : (hash + 's');

        if (hash === 'people') {
            newHash = hash;
        }


        switch(newHash) {
            case 'products':
                this.type = 'produit';
                break;

            case 'projects':
                this.type = 'projet';
                break;

            case 'partners':
                this.type = 'partenaire';
                break;

            case 'people':
            case 'person':
                this.type = 'utilisateur';
                break;

            case 'visits':
                this.type = 'visite';
                break;

            case 'finances':
                this.type = 'état financier';
                break;

            default:
                this.type = 'enregistrement';
        }

        
        Ext.defer(function () {
            if (vm.get('record') === null) {
                me.redirectTo(newHash);
            }

        }, 2000, this);
    },

    getRecord: function() {
        return this.getViewModel().get('record');
    },

    getItemCount: function(tabs) {
        return tabs.getInnerItems().length;
    },

    getActiveIndex: function(tabs) {
        return tabs.getInnerItems().indexOf(tabs.getActiveItem());
    },

    goToFirstScreen: function(increment) {
        var me = this,
            tabs = me.lookup('tabs');

        if (tabs) {
            tabs.setActiveItem(0);
        }       
    },

    advance: function(increment) {
        var me = this,
            form = me.getView(),
            tabs = me.lookup('tabs'),
            index = me.getActiveIndex(tabs),
            count = me.getItemCount(tabs),
            next = index + increment;

        tabs.setActiveItem(Math.max(0, Math.min(count-1, next)));        
    },

    resync: function() {
        var me = this,
            vm = me.getViewModel(),
            tabs = me.lookup('tabs'),
            prev = me.lookup('prev'),
            next = me.lookup('next'),
            index = me.getActiveIndex(tabs),
            count = me.getItemCount(tabs),
            single = count < 2;

        tabs.getTabBar().setHidden(single);
        prev.setDisabled(index <= 0).setHidden(single);
        next.setDisabled(index == -1 || index >= count-1).setHidden(single);

        if (index === (count - 1) || !me.getView().getFloated()) {
            me.getViewModel().set('finish', true);
        } else {
            me.getViewModel().set('finish', false);
        }
    },

    finalize: function() {
        var view = this.getView();

        if (view.getFloated()) {
            view.close();
        } else {
            Ext.History.back();
        }

        var homeView,
            len = location.hash.length,
            hash = location.hash.slice(1, len - 1),
            queryStr = hash + 'browse';

        // we don't need it for browse/{id}/edit
        if (hash.indexOf('/') !== -1) {
            return;
        }

        homeView = Ext.ComponentQuery.query(queryStr);

        if (homeView) {
            homeView = homeView[0];

            homeView.fireEvent('recorddatachanged');
        }

    },


    validate: function () {
        var me = this,
            form = me.getView(),
            fields = form.getFields(),
            invalidFields = [],
            record = me.getViewModel().get('record'),

            doProcess = function (field) {
                if (field.validate()) {
                    return;
                }

                
                var fieldName = field.getLabel() || field.getBoxLabel();
                var value = field.getValue();
                var bindName = field.getBind().value.stub.name;
                var recordValue = record.get(bindName);

                if (Ext.isEmpty(recordValue)) {
                    fieldName = fieldName + ' : ' + field.getValidationMessage() + ' et vide';
                    invalidFields.push(fieldName);

                } else {
                    field.clearValue();
                    field.setValue(recordValue);
                    // Send focus back to the field
                    field.focus();

                    /*if(!field.validate()) {
                        fieldName = fieldName + ' : ' + field.getValidationMessage();
                        invalidFields.push(fieldName);
                    }*/

                }

            };

            
        if (fields && Ext.isObject(fields)) {
            Object.keys(fields).forEach(function(key) {
                var obj = fields[key];

                if (Array.isArray(obj)) {
                    obj.forEach(function (field) {
                        doProcess(field);
                    });

                } else {
                    doProcess(obj);
                }
                
            });

        }

        return invalidFields;
    },

    onSubmitTap: function() {
        var me = this,
            form = me.getView(),
            record = me.getViewModel().get('record'),
            modification, 
            changes = record.modified,
            isDirty = record.isDirty(),
            isCreation = record.isPhantom(),
            invalidFields,
            validationMsg;

        invalidFields = me.validate();

        if (invalidFields.length > 0) {
            validationMsg = '<h3>Formulaire invalide</h3>Veuillez vérifier les champs suivants :<br/> <ul><li>';
            validationMsg += invalidFields.join('</li><li>');
            validationMsg += '</ul>'

            App.ux.Signals.showWarning(validationMsg, true);
            return;
        }

        if (!isDirty) {
            me.finalize();
            return;
        }

        
        if (isCreation) {
            modification = (record.get('name') || record.get('intitule') );
        } else {
            modification = me.type;
            modification += ' ';
            modification += (record.get('name') || record.get('intitule'));
            modification += '<ul>';

            Object.keys(changes).forEach(function(field) {
                modification += ('<li><b>' + field + ' :</b> &nbsp;' + record.getModified(field) + '&nbsp; ---> ' + record.get(field));
                modification += '</li>';
            });

            modification += '</ul>';
        }

        form.setMasked({ xtype: 'loadmask' });
        form.clearErrors();
        

        record.save({
            callback: function(result, operation) {
                form.setMasked(false);

                if (operation.hasException()) {
                    var error = operation.getError(),
                        formErrors = App.util.Errors.toForm(error);

                    if (Ext.isObject(formErrors)) {
                        var errNames = Object.keys(formErrors),
                            fieldName = errNames[0],
                            msg = fieldName + ' : ' + formErrors[fieldName];

                        App.ux.Signals.showWarning(msg, true);

                        form.setErrors(formErrors);
                    }

                    return;
                }

                App.ux.Signals.showSuccess('Modification réussie');

                me.fireEvent('actionlog', (isCreation ? 'Création ' : 'Modification ') + me.type, modification, result);

                me.finalize(result);
            }
        });
    },

    onCancelTap: function() {
        this.finalize();
    },

    onPrevTap: function() {
        this.advance(-1);
    },

    onNextTap: function() {
        this.advance(1);
    },

    onScreenAdd: function() {
        this.resync();
    },

    onScreenRemove: function(tabs) {
        if (!tabs.destroying) {
            this.resync();
        }
    },

    onScreenActivate: function(tabs) {
        // This event is triggered when the view is being destroyed!
        if (!tabs.destroying) {
            this.resync();
        }
    }
});

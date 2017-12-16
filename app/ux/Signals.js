/**
 * Created by simo on 28/08/2016.
 */
Ext.define('App.ux.Signals', {

    singleton: true,

    requires: [
        'Ext.MessageBox',
        'Ext.Toast'
    ],
    

    askUserPermission: function (msg, handler, scope, args, appendArgs) {
        msg = '<h3>' + msg + '</h3>';
        Ext.Msg.confirm('Confirmation', msg, Ext.bind(handler, scope, args, appendArgs));
    },

    showWarning: function (msg, isError) {
        Ext.Msg.alert(isError ? 'Erreur' : 'Avertissement', msg);
    },


    showSuccess: function (msg, isCRUD) {
        if (isCRUD == undefined) {
            isCRUD = true;
        }

        Ext.toast({
            message: isCRUD ? '<h3>Opération réussie</h3><br/>' + msg : msg,
            timeout: 1000,
            centered: false,
            width: 600,
            minWidth: 600,
            minHeight: 200,
            height: 200,
            padding: 20,
            top: 0,
            right: 10
        });
    },


    CRUDCallback: function (store, batch, options, callback){
		var msg;
		
		if(batch.hasException()){
			if (store && store.isStore) {
                store.rejectChanges();
            }

            var exception = batch.exceptions[0],
                errResp = App.util.Errors.toMsg(exception.getError());
			
            msg = "Nous n'avons pas pu Enregistrer les Changements ! <br/><hr/>";

            if (errResp) {
                msg += errResp;
            }
			
			this.showWarning(msg, true);	
		
        } else {
            // Successful toast            
            this.showSuccess('Vos Changements ont été Enregistrés');

            callback && callback();
        }

	}

});
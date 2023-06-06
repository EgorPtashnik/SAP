sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",

    "yp/http/Http",
    "yp/util/formatter"
], function(Controller, UIComponent, Http, Formatter) {

    return Controller.extend("yp.controller.BaseController", {
        Http: Http,
        Formatter: Formatter,

        getConfig() {
            return this.getOwnerComponent().getModel("config");
        },

        getRouter() {
            return UIComponent.getRouterFor(this);
        },

        onDialogClose(event) {
            event.getSource().getParent().close();
        },

        /*-------------------PRIVATE SECTION------------------*/
        
        _openDeleteConfirmationDialog() {
            if (!this.DeleteConfirmationDialog) {
                this.loadFragment({name: "yp.view.common.DeleteConfirmationDialog"}).then(fragment => {
                    this.DeleteConfirmationDialog = fragment;
                    this.DeleteConfirmationDialog.open()
                })
            } else {
                this.DeleteConfirmationDialog.open();
            }
        },

        _toggleBusy() {
            this.getConfig().setProperty("/busy", !this.getConfig().getProperty("/busy"));
        }

    });
});

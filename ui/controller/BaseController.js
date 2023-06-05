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

        getViewModel() {
            return this.getView().getModel();
        },

        onOpenDeleteConfirmationDialog() {
            if (!this.DeleteConfirmationDialog) {
                this.loadFragment({name: "yp.view.common.DeleteConfirmationDialog"}).then(fragment => {
                    this.DeleteConfirmationDialog = fragment;
                    this.DeleteConfirmationDialog.open()
                })
            } else {
                this.DeleteConfirmationDialog.open();
            }
        },

        onDialogClose(event) {
            event.getSource().getParent().close();
        }

    });
});

sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",

    "yp/http/Http"
], function(Controller, UIComponent, Http) {

    return Controller.extend("yp.controller.BaseController", {
        Http: Http,

        getConfig() {
            return this.getOwnerComponent().getModel("config");
        },

        getRouter() {
            return UIComponent.getRouterFor(this);
        },

        getViewModel() {
            return this.getView().getModel();
        },

        onDialogClose(event) {
            event.getSource().getParent().close();
        }

    });
});
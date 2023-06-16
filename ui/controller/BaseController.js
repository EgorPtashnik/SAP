sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function(Controller, UIComponent) {

    return Controller.extend("yp.controller.BaseController", {

        getRouter() {
            return UIComponent.getRouterFor(this);
        },

        onDialogClose(event) {
            event.getSource().getParent().close();
        }
    });
});

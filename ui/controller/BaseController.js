sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function(Controller, UIComponent) {

    return Controller.extend("yp.controller.BaseController", {

        getRouter() {
            return UIComponent.getRouterFor(this);
        },

        onDialogClose(oEvent) {
            oEvent.getSource().getParent().close();
        },

        setSelectedNavigationItem(oEvent) {
            const sRouteName = oEvent.getParameter("name");
            this.getOwnerComponent().getModel("routes").setProperty("/selectedItem", sRouteName);
        },

        getModel(sModelName) {
            return sModelName ? this.getView().getModel(sModelName) : this.getView().getModel();
        }
    });
});

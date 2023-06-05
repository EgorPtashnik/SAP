sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {

    return Controller.extend("yp.controller.BaseController", {

        getConfig() {
            this.getOwnerComponent().getModel("config");
        }

    });
});

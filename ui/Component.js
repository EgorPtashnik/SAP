sap.ui.define([
    "sap/ui/core/UIComponent",

    "yp/model/Routes"
], function (UIComponent, RoutesModel) {
    "use strict";

    return UIComponent.extend("yp.Component", {
        metadata: {
            manifest: "json"
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(RoutesModel.getModel(), "routes");

            this.getRouter().initialize();
        },

        destroy() {
            UIComponent.prototype.destroy.apply(this, arguments);
        }

    });
});

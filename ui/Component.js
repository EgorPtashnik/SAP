sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",

    "yp/model/Config"
], function (UIComponent, JSONModel, Config) {
    "use strict";

    return UIComponent.extend("yp.Component", {
        metadata: {
            manifest: "json"
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);

            this.setModel(new JSONModel(Config), "config")

            this.getRouter().initialize();
        },

        destroy() {
            UIComponent.prototype.destroy.apply(this, arguments);
        }

    });
});

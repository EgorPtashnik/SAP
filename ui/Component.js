sap.ui.define([
    "sap/ui/core/UIComponent"
], function (UIComponent) {
    "use strict";

    return UIComponent.extend("yp.Component", {
        metadata: {
            manifest: "json"
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);

            this.getRouter().initialize();
        },

        destroy() {
            UIComponent.prototype.destroy.apply(this, arguments);
        }

    });
});

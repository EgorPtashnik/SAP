sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",

    "yp/model/Config",
    "yp/http/Http"
], function (UIComponent, JSONModel, Config, Http) {
    "use strict";

    return UIComponent.extend("yp.Component", {
        metadata: {
            manifest: "json"
        },

        init() {
            UIComponent.prototype.init.apply(this, arguments);
            this.setModel(new JSONModel(Config), "config")

            Http.MasterData.getTodoListCategories().then(res => {
                if (!res.error && res.message === "success")
                    this.getModel("config").setProperty("/TodoListCategories", [...res.data]);
            });


            this.getRouter().initialize();
        },

        destroy() {
            UIComponent.prototype.destroy.apply(this, arguments);
        }

    });
});

sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";

    return {
        getModel() {
            return new JSONModel({
                selectedItem: "",
                items: this._getItems()
            });
        },

        _getItems() {
            return [
                {
                    route: "todo",
                    text: "Todo Lists",
                    icon: "sap-icon://activities"
                }
            ]
        }
    }
});

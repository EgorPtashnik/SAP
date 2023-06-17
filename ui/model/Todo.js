sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";

    return {
        getModel() {
            return new JSONModel({
                create: {
                    name: ""
                }
            })
        }
    }
});

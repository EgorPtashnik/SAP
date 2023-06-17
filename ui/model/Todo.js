sap.ui.define([
    "sap/ui/model/json/JSONModel"
], function(JSONModel) {
    "use strict";

    return {
        getModel() {
            return new JSONModel({
                busy: {
                    todoCategoryList: false,
                    todoCategoryDetail: false
                },
                create: {
                    name: ""
                }
            })
        }
    }
});

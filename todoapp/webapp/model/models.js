sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device",
    "./stores/ToDoStore"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device, todo) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay");
                return oModel;
            },
            createStore() {
                const oModel = new JSONModel({
                    todo: todo
                });
                return oModel;
            }
        };
});
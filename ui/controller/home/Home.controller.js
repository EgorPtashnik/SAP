sap.ui.define([
    "yp/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {

    return BaseController.extend("yp.controller.home.Home", {
        onInit() {
            this.getRouter().attachRouteMatched(this._onRouteMatch, this);
            this.getView().setModel(new JSONModel());
        },

        _onRouteMatch() {
            this.Http.TodoList.get().then(res => this.getViewModel().setData(res.data));
        }
    });
});

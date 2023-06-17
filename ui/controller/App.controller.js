sap.ui.define([
    "yp/controller/BaseController",

    "yp/model/Routes",
    "yp/model/App"
], function(BaseController, RoutesModel, AppModel) {

    return BaseController.extend("yp.controller.App", {
        onInit() {
            this.getView().setModel(AppModel.getModel());
        },

        onSelectNavigationItem(sRouteName) {
            this.getRouter().navTo(sRouteName);
        },

        toggleSideNavigation(bExpanded) {
            this.getModel().setProperty("/sideNavExpanded", !bExpanded);
        },
    });
});

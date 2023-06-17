sap.ui.define([
    "yp/controller/BaseController",

    "yp/model/App"
], function(BaseController, ViewModel) {

    return BaseController.extend("yp.controller.App", {
        onInit() {
            this.getView().setModel(ViewModel.getModel());
        },

        onSelectNavigationItem(sRouteName) {
            this.getRouter().navTo(sRouteName);
        },

        toggleSideNavigation(bExpanded) {
            this.getModel().setProperty("/sideNavExpanded", !bExpanded);
        },
    });
});

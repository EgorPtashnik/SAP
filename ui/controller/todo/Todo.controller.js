sap.ui.define([
    "yp/controller/BaseController"
], function(BaseController) {

    return BaseController.extend("yp.controller.todo.Todo", {
        onInit() {
            this.oCreateCategoryDialog = null;
            
            this.getRouter().getRoute("todo").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched(oEvent) {
            this.setSelectedNavigationItem(oEvent);
        },

        onOpenCreateCategoryDialog() {
            if (!this.oCreateCategoryDialog) {
                this.loadFragment({name: "yp.view.todo.master.modal.CreateCategoryDialog"}).then(oFragment => {
                    console.log(oFragment);
                    this.oCreateCategoryDialog = oFragment;
                    console.log(this.oCreateCategoryDialog);
                    this.oCreateCategoryDialog.open();
                });
            } else {
                this.oCreateCategoryDialog.open();
            }
        }
    });
});

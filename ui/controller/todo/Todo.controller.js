sap.ui.define([
    "yp/controller/BaseController",

    "sap/m/MessageBox",
    "sap/m/MessageToast",

    "yp/model/Todo"
], function(BaseController, MessageBox, MessageToast, ViewModel) {

    return BaseController.extend("yp.controller.todo.Todo", {
        onInit() {
            this.getView().setModel(ViewModel.getModel());

            this.oCreateCategoryDialog = null;
            
            this.getRouter().getRoute("todo").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched(oEvent) {
            this.setSelectedNavigationItem(oEvent);
        },

        onOpenCreateCategoryDialog() {
            if (!this.oCreateCategoryDialog) {
                this.loadFragment({name: "yp.view.todo.master.modal.CreateCategoryDialog"}).then(oFragment => {
                    this.oCreateCategoryDialog = oFragment;
                    this.oCreateCategoryDialog.open();
                });
            } else {
                this.oCreateCategoryDialog.open();
            }
        },

        async onSubmitNewCategory() {
            this.getModel().setProperty("/busy/todoCategoryList", true);
            const oCategory = this.getModel().getProperty("/create");
            const oCreateCategoryAction = this.oCreateCategoryDialog.getObjectBinding("todoService");
            Object.entries(oCategory).forEach(entry => oCreateCategoryAction.setParameter(entry[0], entry[1]));
            oCreateCategoryAction.execute()
                .then(() => {
                    MessageToast.show("Category was successfully created");
                    this.getView().byId("idTodoCategoryTable").getBinding("items").refresh();
                    this.oCreateCategoryDialog.close();
                    this.getModel().setProperty("/busy/todoCategoryList", false);
                })
                .catch(err => {
                    this.getModel().setProperty("/busy/todoCategoryList", false);
                    MessageBox.error(err.error.message, {
                        ixon: MessageBox.Icon.ERROR,
                        title: `${err.status}: ${err.statusText}`
                    });
                });
        }
    });
});

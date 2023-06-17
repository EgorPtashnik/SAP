sap.ui.define([
    "yp/controller/BaseController",

    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/layout/SplitPane",

    "yp/model/Todo"
], function(BaseController, MessageBox, MessageToast, SplitPane, ViewModel) {

    return BaseController.extend("yp.controller.todo.Todo", {
        onInit() {
            this.getView().setModel(ViewModel.getModel());

            this.oCreateCategoryDialog = null;
            
            this.getRouter().getRoute("todo").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched(oEvent) {
            try {
                this.setSelectedNavigationItem(oEvent);
                const sId = oEvent.getParameter("arguments").id;
                if (sId) {
                    this.getModel().setProperty("/busy/todoCategoryDetail", true);
                    this.getView().bindElement({
                        path: `todoService>/TodoCategory(${sId})`,
                        parameters: {
                            $expand: "Items"
                        },
                        events: {
                            patchCompleted: () => {
                                this.getView().byId("idTodoCategoryTable").getBinding("items").refresh();
                            }
                        }
                    });
                    const oPaneContainer = this.getView().byId("idPaneContainer");
                    if (oPaneContainer.getPanes().length === 1) {
                        this.loadFragment({name: "yp.view.todo.detail.Page"}).then(oFragment => {
                            const oDetailPane = new SplitPane();
                            oDetailPane.setContent(oFragment);
                            oPaneContainer.addPane(oDetailPane);
                        this.getModel().setProperty("/busy/todoCategoryDetail", false);
                        });
                    }
                    this.getModel().setProperty("/busy/todoCategoryDetail", false);
                }
            } catch(e) {
                throw new Error(e);
            }
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
                    MessageBox.alert(err.error.message, {
                        icon: MessageBox.Icon.ERROR,
                        title: `${err.status}: ${err.statusText}`
                    });
                });
        },

        onTodoCategoryPress(oEvent) {
            const { ID } = oEvent.getParameter("listItem").getBindingContext("todoService").getObject();
            this._navToDetail(ID);
        },

        _navToDetail(sId) {
            this.getRouter().navTo("todo", { id: sId });
        }
    });
});

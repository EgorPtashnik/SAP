sap.ui.define([
    "yp/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {

    return BaseController.extend("yp.controller.home.Home", {
        onInit() {
            this.getRouter().attachRouteMatched(this._onRouteMatch, this);
            this.getView().setModel(new JSONModel({
                lists: [],
                deleteMode: false,
                deleteId: "",
                create: {
                    name: "",
                    category_id: ""
                }
            }));

            this.CreateDialog = null;
            this.DeleteConfirmationDialog = null;
        },

        _onRouteMatch() {
            this.Http.TodoList.get().then(res => this.getViewModel().setProperty("/lists", res.data));
        },

        onOpenCreateDialog() {
            this._resetCreateData();
            this._openCreateDialog();
            console.log(this.getConfig().getData());
        },

        onOpenDeleteConfirmationDialog(event) {
            const path = event.getParameter("listItem").getBindingContext().getPath();
            this.getViewModel().setProperty("/deleteId", this.getViewModel().getProperty(path + "/id"));
            this._openDeleteConfirmationDialog();
        },

        onSubmitNewList(event) {
            this._toggleBusy();
            const newList = this.getViewModel().getProperty("/create");
            this.Http.TodoList.create(newList).then(res => {
                if (!res.error && res.message === "success") {
                    this.getViewModel().setProperty("/lists", [...this.getViewModel().getProperty("/lists"), res.list]);
                    this._toggleBusy();
                }
            });
            this.onDialogClose(event);
        },

        onConfirmDeleteList(event) {
            this._toggleBusy();
            const deleteId = this.getViewModel().getProperty("/deleteId");
            this.Http.TodoList.delete(deleteId).then(res => {
                if (!res.error && res.message === "success") {
                    this.getViewModel().setProperty("/lists", [...this.getViewModel().getProperty("/lists").filter(list => list.id !== deleteId)]);
                    this._toggleBusy();
                }
            });
            this.onDialogClose(event);
        },

        /*-------------------PRIVATE SECTION-------------------*/
        _resetCreateData() {
            this.getViewModel().setProperty("/create", {
                name: "",
                category_id: ""
            });
        },

        _openCreateDialog() {
            if (!this.CreateDialog) {
                this.loadFragment({name: "yp.view.home.modals.CreateDialog"}).then(fragment => {
                    this.CreateDialog = fragment;
                    this.CreateDialog.open();
                });
            } else {
                this.CreateDialog.open();
            }
        }
    });
});

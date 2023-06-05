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
                create: {
                    name: ""
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
        },

        onSubmitNewList(event) {
            const newList = this.getViewModel().getProperty("/create");
            this.Http.TodoList.create(newList).then(res => {
                if (res.message === "success") {
                    this.getViewModel().setProperty("/lists", [...this.getViewModel().getProperty("/lists"), res.list]);
                }
            });

            this.onDialogClose(event);
        },

        /*-------------------PRIVATE SECTION-------------------*/
        _resetCreateData() {
            this.getViewModel().setProperty("/create", {
                name: ""
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

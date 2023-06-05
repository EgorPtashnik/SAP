sap.ui.define([
    "yp/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {

    return BaseController.extend("yp.controller.home.Home", {
        onInit() {
            this.getRouter().attachRouteMatched(this._onRouteMatch, this);
            this.getView().setModel(new JSONModel({
                lists: [],
                create: {
                    name: ""
                }
            }));

            this.CreateDialog = null;
        },

        _onRouteMatch() {
            this.Http.TodoList.get().then(res => this.getViewModel().setProperty("/lists", res.data));
        },

        onCreate() {
            this._resetCreateData();
            this._openCreateDialog();
        },

        /*-------------------PRIVATE SECTION-------------------*/
        _resetCreateData() {
            this.getViewModel().setProperty("/create", {
                name: "",
                status: 0,
                category: 0
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

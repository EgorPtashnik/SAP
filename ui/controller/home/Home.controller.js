sap.ui.define([
    "yp/controller/BaseController",
    "sap/ui/model/json/JSONModel",

    "yp/controller/home/MasterData"
], function(BaseController, JSONModel, MasterDataLogic) {

    return BaseController.extend("yp.controller.home.Home", {
        MasterData: MasterDataLogic,

        onInit() {
            this.getRouter().attachRouteMatched(this._onRouteMatch, this);
            this.model = new JSONModel({
                lists: [],
                create: {
                    list: {
                        name: "",
                        category_id: ""
                    },
                    category: {
                        name: ""
                    }
                }
            });
            this.getView().setModel(this.model);

            this.CreateListDialog = null;
            this.CreateCategoryDialog = null;
        },

        _onRouteMatch() {
            this.Http.TodoList.get().then(res => this.model.setProperty("/lists", res.data));
        },

        onOpenCreateListDialog() {
            this._resetCreateListData();
            this._openCreateListDialog();
        },

        onOpenCreateCategoryDialog() {
            this._resetCreateCategoryData();
            this._openCreateCategoryDialog();
        },

        onOpenDeleteConfirmationDialog(event) {
            const path = event.getParameter("listItem").getBindingContext().getPath();
            this.model.setProperty("/deleteId", this.model.getProperty(path + "/id"));
            this._openDeleteConfirmationDialog();
        },

        onSubmitNewList(event) {
            this._toggleBusy();
            const newList = this.model.getProperty("/create/list");
            this.Http.TodoList.create(newList).then(res => {
                if (!res.error && res.message === "success") {
                    this.model.setProperty("/lists", [...this.model.getProperty("/lists"), res.list]);
                    this._toggleBusy();
                }
            });
            this.onDialogClose(event);
        },

        onSubmitNewCategory(event) {
            this._toggleBusy();
            const newCategory = this.model.getProperty("/create/category");
            this.Http.MasterData.createTodoListCategory(newCategory).then(res => {
                if (!res.error && res.message === "success") {
                    this.getConfig().setProperty("/TodoListCategories", [...this.getConfig().getProperty("/TodoListCategories"), res.newCategory]);
                    this._toggleBusy();
                }
            });
            this.onDialogClose(event);
        },

        /*-------------------PRIVATE SECTION-------------------*/
        
        _resetCreateListData() {
            this.model.setProperty("/create/list", {
                name: "",
                category_id: this.getConfig().getProperty("/TodoListCategories")[0].id
            });
        },

        _resetCreateCategoryData() {
            this.model.setProperty("/create/category", {
                category: "",
            });
        },

        _openCreateListDialog() {
            if (!this.CreateListDialog) {
                this.loadFragment({name: "yp.view.home.modals.CreateListDialog"}).then(fragment => {
                    this.CreateListDialog = fragment;
                    this.CreateListDialog.open();
                });
            } else {
                this.CreateListDialog.open();
            }
        },

        _openCreateCategoryDialog() {
            if (!this.CreateCategoryDialog) {
                this.loadFragment({name: "yp.view.home.modals.CreateCategoryDialog"}).then(fragment => {
                    this.CreateCategoryDialog = fragment;
                    this.CreateCategoryDialog.open();
                });
            } else {
                this.CreateCategoryDialog.open();
            }
        }
    });
});

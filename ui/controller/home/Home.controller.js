sap.ui.define([
    "yp/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox"
], function(BaseController, JSONModel, MessageBox) {

    return BaseController.extend("yp.controller.home.Home", {
        onInit() {
            this.getRouter().attachRouteMatched(this._onRouteMatch, this);
            this.model = new JSONModel({
                lists: [],
                editMode: false,
                deleteId: "",
                create: {
                    list: {
                        name: "",
                        category_id: ""
                    },
                    categoey: {
                        name: ""
                    }
                },
                backup: []
            });
            this.getView().setModel(this.model);

            this.CreateListDialog = null;
            this.CreateCategoryDialog = null;
            this.DeleteConfirmationDialog = null;
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
            const newList = this.model.getProperty("/create");
            this.Http.TodoList.create(newList).then(res => {
                if (!res.error && res.message === "success") {
                    this.model.setProperty("/lists", [...this.model.getProperty("/lists"), res.list]);
                    this._toggleBusy();
                }
            });
            this.onDialogClose(event);
        },

        onConfirmDeleteList(event) {
            this._toggleBusy();
            const deleteId = this.model.getProperty("/deleteId");
            this.Http.TodoList.delete(deleteId).then(res => {
                if (!res.error && res.message === "success") {
                    this.model.setProperty("/lists", [...this.model.getProperty("/lists").filter(list => list.id !== deleteId)]);
                    this._toggleBusy();
                }
            });
            this.onDialogClose(event);
        },

        onEdit() {
            this._toggleEditMode();
            if (this.model.getProperty("/editMode"))
                this.model.setProperty("/backup", [...this.model.getProperty("/lists")]);
        },

        onSave() {

        },

        onDiscard() {
            MessageBox.confirm("All changes will be lost. Do you want to exit edit mode?", {
                title: "Confirm",
                actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
                onClose: action => {
                    if (action === MessageBox.Action.OK) {
                        this._discardChanges();
                        this._toggleEditMode();
                    }
                }
            })
        },

        /*-------------------PRIVATE SECTION-------------------*/
        _discardChanges() {
            this.model.setProperty("/lists", [...this.model.getProperty("/backup")]);
        },

        _toggleEditMode() {
            this.model.setProperty("/editMode", !this.model.getProperty("/editMode"));
        },
        
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

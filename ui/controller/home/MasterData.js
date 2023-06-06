sap.ui.define([
    "sap/m/MessageBox"
], function(MessageBox) {
    "use strict";

    return {
        onCreateCategory() {
            this._toggleBusyDialog();
            const newCategory = this.model.getProperty("/create/masterData/category");
            this.Http.MasterData.createTodoListCategory(newCategory).then(res => {
                if (!res.error && res.message === "success") {
                    this.getConfig().setProperty("/TodoListCategories", [...this.getConfig().getProperty("/TodoListCategories"), res.category]);
                    this._resetCreateMasterData();
                    this._toggleBusyDialog();
                }
            });
        },

        onDeleteCategory(event) {
            this._toggleBusyDialog();
            const path = event.getParameter("listItem").getBindingContext("config").getPath();
            const categoryId = this.getConfig().getProperty(path).id;
            this.Http.MasterData.deleteTodoListCategory(categoryId).then(res => {
                if (!res.error && res.message === "success") {
                    this.getConfig().setProperty("/TodoListCategories", this.getConfig().getProperty("/TodoListCategories").filter(item => item.id !== +res.id));
                    this._toggleBusyDialog();
                }
            })
        },

        onUpdateCategory(event) {
            this._toggleBusyDialog();
            const categoryId = this.getConfig().getProperty(event.getSource().getBindingContext("config").getPath()).id;
            const newCategoryName = event.getParameter("newValue");
            this.Http.MasterData.updateTodoListCategory({id: categoryId, category: newCategoryName}).then(res => {
                if (!res.error && res.message === "success") {
                    this.model.refresh(true);
                    this._toggleBusyDialog();
                }
            })
        },

        /*--------------------------------PRIVATE SECTION---------------------------------*/
        _resetCreateMasterData() {
            this.model.setProperty("/create/masterData", {
                category: {
                    name: ""
                }
            });
        }
    };
});
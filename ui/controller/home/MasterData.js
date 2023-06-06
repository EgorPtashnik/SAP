sap.ui.define([

], function() {
    "use strict";

    return {
        onCreateCategory() {
            const newCategory = this.model.getProperty("/create/masterData/category");
            this.Http.MasterData.createTodoListCategory(newCategory).then(res => {
                if (!res.error && res.message === "success") {
                    this.getConfig().setProperty("/TodoListCategories", [...this.getConfig().getProperty("/TodoListCategories"), res.category]);
                    this._resetCreateMasterData();
                }
            });
        },

        onDeleteCategory(event) {
            const path = event.getParameter("listItem").getBindingContext("config").getPath();
            const categoryId = this.getConfig().getProperty(path);
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
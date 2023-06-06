sap.ui.define([
    "yp/http/Base"
], function(Base) {
    "use strict";
    const BASE_URL="/api/masterData";

    return {
        ...Base,
        
        getTodoListCategories() {
            return this._fetchJSON(BASE_URL + `/Categories`);
        },

        createTodoListCategory(newCategory) {
            return this._fetchJSON(BASE_URL + `/Categories`, {
                body: JSON.stringify(newCategory),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        },

        updateTodoListCategory(newCategory) {
            return this._fetchJSON(BASE_URL + `/Categories/${newCategory.id}`, {
                body: JSON.stringify(newCategory),
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        },

        deleteTodoListCategory(categoryId) {
            return this._fetchJSON(BASE_URL + `/Categories/${categoryId}`, {
                method: "DELETE"
            });
        }

    }

});

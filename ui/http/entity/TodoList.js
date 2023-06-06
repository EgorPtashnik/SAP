sap.ui.define([
    "yp/http/Base"
], function(Base) {
    "use strict";
    const BASE_URL="/api/todoLists/";

    return {
        ...Base,

        get() {
            return this._fetchJSON(BASE_URL);
        },

        get(id) {
            return this._fetchJSON(BASE_URL, {id: id});
        },

        create(newList) {
            return this._fetchJSON(BASE_URL, {
                body: JSON.stringify(newList),
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        },

        update(newList) {
            return this._fetchJSON(BASE_URL + `/${newList.id}`, {
                body: JSON.stringify(newList),
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                }
            })
        },

        delete(listId) {
            return this._fetchJSON(BASE_URL + `/${listId}`, {
                method: "DELETE"
            });
        }
    }

});

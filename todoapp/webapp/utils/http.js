sap.ui.define([
    "yp/ptashnik/todoapp/utils/constants"
], (C) => {
    return {
        getTodoLists: () => {
            return fetch(C.SERVER_URL + "/todoLists").then( (res) => res.json());
        },

        getTodoItems: () => {
            return fetch(C.SERVER_URL + "/todos").then( (res) => res.json());
        }
    }
});
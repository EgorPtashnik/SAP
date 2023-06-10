sap.ui.define([], function() {
    "use strict";

    return {
        busy: false,
        busyDialog: false,
        TodoListCategories: [],
        tableSettings: localStorage.getItem("tableSettings") 
            ? JSON.parse(localStorage.getItem("tableSettings")) 
            : {
                showOverlay: false,
                columns: {
                    name: true,
                    category: true,
                    status: true,
                    created_at: false,
                    updated_at: false
                }
            }
    }

});

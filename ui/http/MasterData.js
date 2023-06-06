sap.ui.define([
    "yp/http/Base"
], function(Base) {
    "use strict";
    const BASE_URL="/api/masterData";

    return {
        ...Base,
        
        getTodoListCategories() {
            return this._fetchJSON(BASE_URL + "/Categories");
        }
    }

});

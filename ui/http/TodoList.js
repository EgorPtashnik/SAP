sap.ui.define([
    "yp/http/Base"
], function(Base) {
    "use strict";
    const BASE_URL="/api/todoLists"

    return {
        ...Base,

        get() {
            return this._fetchJSON(BASE_URL);
        },

        get(id) {
            return this._fetchJSON(BASE_URL, {id: id});
        }
    }

});

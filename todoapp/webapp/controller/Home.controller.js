sap.ui.define([
    "yp/ptashnik/todoapp/controller/BaseController",
    "yp/ptashnik/todoapp/model/actions/Actions"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Actions) {
        "use strict";

        return Controller.extend("yp.ptashnik.todoapp.controller.Home", {
            onInit: function () {
                this.dispatch(Actions.FETCH_DATA);
            }
        });
    });

sap.ui.define([
    "yp/landing/controller/BaseController",
    "yp/landing/model/actions/Actions"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Actions) {
        "use strict";

        return Controller.extend("yp.landing.controller.Home", {

            onInit() {
                this.dispatch(Actions.TOGGLE_BUSY);
            },

            onAfterRendering() {
                this.dispatch(Actions.TOGGLE_BUSY);
            },

            onSkillNamePress(event) {
                const link = event.getSource().getBindingContext("store").getObject().link;
                sap.m.URLHelper.redirect(link, true);
            }
        });
    });

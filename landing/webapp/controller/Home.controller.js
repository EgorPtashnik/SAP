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
                console.log(this.getOwnerComponent().getModel("device").getData());
                this.dispatch(Actions.TOGGLE_BUSY);
            },

            onAfterRendering() {
                this.dispatch(Actions.TOGGLE_BUSY);
            },

            toggleTheme() {
                this.dispatch(Actions.TOGGLE_DARK_MODE);
                const isDarkMode = this.getStore().getProperty("/App/DarkMode");
                if (isDarkMode) {
                    sap.ui.getCore().applyTheme("sap_horizon_dark");
                } else {
                    sap.ui.getCore().applyTheme("sap_horizon");
                }
            },

            onSkillNamePress(event) {
                const link = event.getSource().getBindingContext("store").getObject().link;
                sap.m.URLHelper.redirect(link, true);
            }
        });
    });

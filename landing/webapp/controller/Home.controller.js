sap.ui.define([
    "yp/landing/controller/BaseController"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("yp.landing.controller.Home", {
            onSkillNamePress(oEvent) {
                const link = oEvent.getSource().getBindingContext("store").getObject().link;
                sap.m.URLHelper.redirect(link, true);
            }
        });
    });

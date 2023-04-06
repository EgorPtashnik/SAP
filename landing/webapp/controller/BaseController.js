sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(Controller) {
      "use strict";
  
      return Controller.extend("yp.landing.controller.BaseController", {
        getStore() {
            return this.getOwnerComponent().getModel("store");
        }
      });
    }
  );
  
sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "yp/landing/model/actions/Actions",
        "yp/landing/model/reducers/Reducers"
    ],
    function(Controller, Actions, Reducers) {
      "use strict";
  
      return Controller.extend("yp.landing.controller.BaseController", {
        getStore() {
          return this.getOwnerComponent().getModel("store");
        },

        dispatch(action, data) {
          const store = this.getStore();
          switch(action) {
            case Actions.TOGGLE_BUSY: Reducers.toggleBusy(store); break;
            case Actions.TOGGLE_DARK_MODE: Reducers.toggleDarkMode(store); break;
          }
        }
      });
    }
  );
  
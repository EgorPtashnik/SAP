sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "yp/ptashnik/todoapp/model/actions/Actions",
        "yp/ptashnik/todoapp/model/reducers/Reducers"
    ],
    function(Controller, Actions, Reducers) {
      "use strict";

      return Controller.extend("yp.ptashnik.todoapp.controller.BaseController", {
        getStore() {
          return this.getOwnerComponent().getModel("store");
        },

        dispatch(action, data) {
          const store = this.getStore();
          switch(action) {
            case Actions.FETCH_DATA: Reducers.fetchData(store); break;
            case Actions.TOGGLE_CREATE_CARD: Reducers.toggleCreateCard(store); break;
          }
        }
      });
    }
  );

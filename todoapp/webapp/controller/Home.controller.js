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
            onInit() {
                this.dispatch(Actions.FETCH_DATA);
            },

            handleCreateNewList() {
              this.dispatch(Actions.TOGGLE_CREATE_CARD);
              this.loadFragment({
                name: "yp.ptashnik.todoapp.view.HomeFragments.CreateList"
              }).then( (createListFragment) => {
                const listContainer = this.byId("ToDoListContainer");
                listContainer.addItem(createListFragment)
              });
            }
        });
    });

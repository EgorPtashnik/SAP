sap.ui.define([
    "yp/controller/BaseController",
    "sap/ui/model/json/JSONModel",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',

    "yp/controller/home/MasterData"
], function(BaseController, JSONModel, Filter, FitlerOperator, MasterDataLogic) {

    return BaseController.extend("yp.controller.home.Home", {
        ...MasterDataLogic,

        onInit() {
            this.getRouter().attachRouteMatched(this._onRouteMatch, this);
            this.model = new JSONModel({
                lists: [],
                filters: {
                    name: ""
                },
                create: this._getCreateModel()
            });
            this.getView().setModel(this.model);

            this.CreateListDialog = null;
            this.MasterDataDialog = null;
        },

        _onRouteMatch() {
            this.Http.TodoList.get().then(res => this.model.setProperty("/lists", res.data));
        },

        onOpenCreateListDialog() {
            this._resetCreateListData();
            this._openCreateListDialog();
        },

        onOpenMasterDataDialog() {
            this._openMasterDataDialog();
        },

        onOpenTableSettingsDialog() {
            this._openTableSettingsDialog();
        },

        onCloseTableSettingsDialog(event) {
            localStorage.setItem("tableSettings", JSON.stringify(this.getConfig().getProperty("/tableSettings")));
            this.onDialogClose(event);
        },

        onSubmitNewList(event) {
            this._toggleBusy();
            const newList = this.model.getProperty("/create/list");
            this.Http.TodoList.create(newList).then(res => {
                if (!res.error && res.message === "success") {
                    this.model.setProperty("/lists", [...this.model.getProperty("/lists"), res.list]);
                    this._toggleBusy();
                }
            });
            this.onDialogClose(event);
        },

        showOverlay() {
            const config = this.getConfig();
            if (!config.getProperty("/tableSettings/showOverlay")) {
                this.getConfig().setProperty("/tableSettings/showOverlay", true);
            }
        },

        onFilter() {
            this._toggleBusy();
            const filters = this._getFilters();
            this.byId("idListTable").getBinding("items").filter(filters);
            this.getConfig().setProperty("/tableSettings/showOverlay", false);
            this._toggleBusy();
        },

        /*--------------------------------------PRIVATE SECTION--------------------------------------*/

        _getFilters() {
            const filterValues = this.model.getProperty("/filters");
            const filters = [];
            if (filterValues.name) {
                filters.push(new Filter({path: "name", operator: FitlerOperator.Contains, value1: filterValues.name}));
            }
            
            return filters;
        },
        
        _resetCreateListData() {
            this.model.setProperty("/create/list", {
                name: "",
                category_id: this.getConfig().getProperty("/TodoListCategories")[0].id
            });
        },

        _openCreateListDialog() {
            if (!this.CreateListDialog) {
                this.loadFragment({name: "yp.view.home.modals.CreateListDialog"}).then(fragment => {
                    this.CreateListDialog = fragment;
                    this.CreateListDialog.open();
                });
            } else {
                this.CreateListDialog.open();
            }
        },

        _openMasterDataDialog() {
            if (!this.MasterDataDialog) {
                this.loadFragment({name: "yp.view.home.modals.masterData.MasterDataDialog"}).then(fragment => {
                    this.MasterDataDialog = fragment;
                    this.MasterDataDialog.open();
                });
            } else {
                this.MasterDataDialog.open();
            }
        },

        _openTableSettingsDialog() {
            if (!this.TableSettingsDialog) {
                this.loadFragment({name: "yp.view.home.modals.TableSettingsDialog"}).then(fragment => {
                    this.TableSettingsDialog = fragment;
                    this.TableSettingsDialog.open();
                });
            } else {
                this.TableSettingsDialog.open();
            }
        },

        _getCreateModel() {
            return {
                list: {
                    name: "",
                    category_id: ""
                },
                masterData: {
                    category: {
                        name: ""
                    }
                }
            }
        }
    });
});

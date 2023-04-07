sap.ui.define([], () => {
    return {
        toggleBusy(store) {
            store.setProperty("/App/Busy", !store.getProperty("/App/Busy"));
        }
    }
})
sap.ui.define([], () => {
    return {
        toggleBusy(store) {
            store.setProperty("/App/Busy", !store.getProperty("/App/Busy"));
        },

        toggleDarkMode(store) {
            store.setProperty("/App/DarkMode", !store.getProperty("/App/DarkMode"));
        }
    }
})
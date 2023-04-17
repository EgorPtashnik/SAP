sap.ui.define([
    "yp/ptashnik/todoapp/utils/http"
], (H) => {
    return {

        fetchData: (store) => {
            store.setProperty("/todo/isFetching", true);
            const getTodoListsPromise = H.getTodoLists();
            const getTodoItemsPromise = H.getTodoItems();
            Promise.all([getTodoListsPromise, getTodoItemsPromise])
                .then( (data) => {
                    store.setProperty("/todo/isFetching", false);
                    console.log(data)
                });
        }
        // toggleDarkMode(store) {
        //     store.setProperty("/App/DarkMode", !store.getProperty("/App/DarkMode"));
        // }
    }
})
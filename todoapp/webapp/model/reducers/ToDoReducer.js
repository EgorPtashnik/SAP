sap.ui.define([
  "yp/ptashnik/todoapp/utils/http"
], (H) => {
  return {

    fetchData(store) {
      store.setProperty("/todo/isFetching", true);
      const getTodoListsPromise = H.getTodoLists();
      const getTodoItemsPromise = H.getTodoItems();
      Promise.all([getTodoListsPromise, getTodoItemsPromise])
        .then((data) => {
          const listData = data[0].data;
          const itemData = data[1].data;
          const preparedData = listData.length ? listData.sort((list,
            nextList) => {
            if (list.card_order > nextList.card_order) {
              return 1;
            }
            if (list.card_order < nextList.card_order) {
              return -1;
            }
            return 0;
          }).forEach((list) => {
            const listItems = itemData.filter((item) => item
              .card_id === list.id).sort((item, nextItem) => {
              if (item.todo_order > nextItem.todo_order) {
                return 1;
              }
              if (item.todo_order < nextItem.todo_order) {
                return -1;
              }
              return 0;
            });
            list.items = listItems;
          }) : [];
          store.setProperty("/todo/todoLists", preparedData);
          store.setProperty("/todo/isFetching", false);
          console.log(store.getData());
        });
    },

    toggleCreateCard(store) {
      store.setProperty("/todo/isCreateCardVisible", !store.getProperty("/todo/isCreateCardVisible"));
    }
  }
})

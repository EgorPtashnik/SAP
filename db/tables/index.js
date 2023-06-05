const Logs = require("./Logs");
const Todo = require("./Todo");
const MasterData = require("./MasterData");

const initialize = db => {
    MasterData.createTodoListCategoryTable(db);

    Todo.createTodoListTable(db);
    Todo.createTodoItemTable(db);
    
    Logs.createErrorLogTable(db);
};

module.exports = {
    initialize
};
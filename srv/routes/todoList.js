const express = require("express");
const TodoListRouter = express.Router();
const TodoListService = require("../services/todoList");

TodoListRouter.use((req, res, next) => {
    console.info(`${req.baseUrl} Time: ${Date.now()}`);
    next();
});

TodoListRouter.get("/", (req, res) => {
    TodoListService.getTodoLists(req, res);
});

TodoListRouter.get("/:id", (req, res) => {
    TodoListService.getTodoList(req, res);
});

TodoListRouter.post("/", (req, res) => {
    TodoListService.createTodoList(req, res);
});

TodoListRouter.put("/:id"), (req, res) => {
    TodoListService.updateTodoList(req, res);
};

TodoListRouter.delete("/:id", (req, res) => {
    TodoListService.deleteTodoList(req, res);
});

module.exports = TodoListRouter;
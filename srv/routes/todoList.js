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

module.exports = TodoListRouter;
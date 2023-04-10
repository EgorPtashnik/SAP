const express = require("express");
const todoListRouter = express.Router();
const todoListService = require("../services/todosService");

todoListRouter.use( (req, res, next) => {
    console.info(`${req.baseUrl} Time: ${Date.now()}`);
    next();
});

todoListRouter.get('/', (req, res) => {
    todoListService.getTodos(req, res);
});

todoListRouter.get('/:id', (req, res) => {
    todoListService.getTodo(req, res);
});

module.exports = todoListRouter;
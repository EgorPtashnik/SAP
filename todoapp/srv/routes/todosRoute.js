const express = require("express");
const todoRouter = express.Router();
const todoService = require("../services/todosService");

todoRouter.use( (req, res, next) => {
    console.info(`${req.baseUrl} Time: ${Date.now()}`);
    next();
});

todoRouter.get('/', (req, res) => {
    todoService.getTodos(req, res);
});

todoRouter.get('/:id', (req, res) => {
    todoService.getTodo(req, res);
});

module.exports = todoRouter;
const db = require("../../db/db");

const TodoListService = {

    getTodoLists: (req, res) => {
        const sql = `
            SELECT LIST.*, COUNT(ITEM.ID) as ItemsCount
            FROM TODOLIST LIST
            LEFT JOIN TODOITEM ITEM 
                ON ITEM.TODOLIST_ID = LIST.ID
            GROUP BY LIST.ID
        `;
        const params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                return;
            }
            res.json({
                message: "success",
                data: rows
            });
        });
    },

    getTodoList: (req, res) => {
        const sql = `
            SELECT *, COUNT(ITEM.ID)
            FROM TODOLIST LIST
            LEFT JOIN TODOITEM ITEM
                ON ITEM.TODOLIST_ID = List.ID
            WHERE LIST.ID = ?
        `;
        const params = [req.params.id];
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
            }
            res.json({
                message: "success",
                data: row
            });
        });
    },

    createTodoList: (req, res) => {
        const sql = `
            INSERT INTO TODOLIST
                (NAME, STATUS, CREATED_AT, UPDATED_AT, CATEGORY_ID)
            VALUES
                (?, ?, ?, ?, ?)
        `;
        const now = new Date().toString();
        const params = [
            req.body.name,
            0,
            now,
            now,
            0
        ];
        db.run(sql, params, function(err) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                return;
            }
            res.json({
                message: "success",
                list: {
                    id: this.lastID,
                    name: req.body.name,
                    status: 0,
                    created_at: now,
                    updated_at: now,
                    category_id: 0
                }
            });
        });
    },

    updateTodoList: (req, res) => {
        const sql = `
        UPDATE TODOLIST SET
            NAME = ?,
            STATUS = ?,
            CREATED_AT = ?,
            UPDATED_AT = ?,
            CATEGORY_ID = ?
        WHERE ID = ?
        `;
        const now = new Date().toString();
        const params = [
            req.body.name,
            req.body.status,
            req.body.created_at,
            now,
            req.body.category_id,
            req.params.id
        ];
        db.run(sql, params, function(err) {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                return;
            }
            res.json({
                message: "success",
                list: {
                    id: req.params.id,
                    name: req.body.name,
                    status: req.body.status,
                    created_at: req.body.created_at,
                    updated_at: now,
                    category_id: req.body.updated_at
                }
            });
        });
    },

    deleteTodoList: (req, res) => {
        const sql = `
            DELETE FROM TODOLIST WHERE ID = ?
        `;
        const params = [req.params.id];
        db.run(sql, params, err => {
            if (err) {
                res.status(400).json({
                    error: err.message
                });
                return;
            }
            res.json({
                message: "success",
                id: req.params.id
            });
        });
    }

};

module.exports = TodoListService;
const db = require("../../db/db");

const TodoListService = {

    getTodoLists: (req, res) => {
        // const sql = `
        //     SELECT *, COUNT(ITEM.ID)
        //     FROM TODOLIST LIST
        //     INNER JOIN TODOITEM ITEM 
        //         ON ITEM.TODOLIST_ID = LIST.ID
        //     GROUP BY LIST.ID
        // `;
        const sql = `
            SELECT *
            FROM TODOLIST LIST
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
            })
        })
    }

};

module.exports = TodoListService;
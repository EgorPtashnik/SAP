const db = require("../../db/db");

const TodoListService = {

    getTodoLists: (req, res) => {
        const sql = `
            SELECT *, COUNT(ITEM.ID)
            FROM TODOLIST LIST
            INNER JOIN TODOITEM ITEM 
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
    }

};

module.exports = TodoListService;
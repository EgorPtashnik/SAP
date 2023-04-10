const db = require("../utils/db");

const todoService = {

    getTodos: (req, res) => {
        const sql = `SELECT * FROM TODOITEM`;
        const params = [];
        db.all(sql, params, (err, rows) => {
            if (err) {
                res.status(400).json({error: err.message});
                return;
            }
            res.json({
                message: "success",
                data: rows
            });
        });
    },

    getTodo: (req, res) => {
        const sql = `SELECT * FROM TODOITEM WHERE id = ?`;
        const params = [req.params.id];
        db.get(sql, params, (err, row) => {
            if (err) {
                res.status(400).json({error: err.message});
            }
            res.json({
                message: "success",
                data: row
            })
        });
    }

};

module.exports = todoService;
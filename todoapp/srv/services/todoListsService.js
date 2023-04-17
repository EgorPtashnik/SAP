const db = require("../utils/db");

const todoListService = {

  getTodoLists: (req, res) => {
    const sql = `SELECT * FROM TODOLIST`;
    const params = [];
    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({
          error: err.message
        });
        return;
      }
      rows.map( (list) => {
        list.items = [];
        return list;
      });
      res.json({
        message: "success",
        data: rows
      });
    });
  },

  getTodoList: (req, res) => {
    const sql = `SELECT * FROM TODOLIST WHERE id = ?`;
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
      })
    });
  }

};

module.exports = todoListService;

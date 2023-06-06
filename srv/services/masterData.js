const db = require("../../db/db");

const MasterDataService = {

    getCategories: (req, res) => {
        const sql = `
            SELECT *
            FROM TODOLISTCATEGORY
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

    createCategory: (req, res) => {
        const sql = `
            INSERT INTO TODOLISTCATEGORY
                (CATEGORY)
            VALUES
                (?)
        `;
        const now = new Date().toString();
        const params = [
            req.body.name,
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
                category: {
                    id: this.lastID,
                    category: req.body.name,
                }
            });
        });
    },

};

module.exports = MasterDataService;
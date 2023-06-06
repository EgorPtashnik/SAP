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

    updateCategory: (req, res) => {
        console.log(req.body);
        const sql = `
        UPDATE TODOLISTCATEGORY SET
            CATEGORY = ?
        WHERE ID = ?
        `;
        const params = [
            req.body.category,
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
                category: {
                    id: req.params.id,
                    category: req.body.category
                }
            });
        });
    },

    deleteCategory: (req, res) => {
        const sql = `
            DELETE FROM TODOLISTCATEGORY WHERE ID = ?
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

module.exports = MasterDataService;
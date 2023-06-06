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
    }

};

module.exports = MasterDataService;
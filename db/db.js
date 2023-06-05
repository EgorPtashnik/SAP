const sqlite3 = require("sqlite3");
const filepath = "./db/database.sqlite";

const tables = require("./tables");

const db = new sqlite3.Database(filepath, err => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.info(`Connected to ${filepath}`);
        tables.initialize(db);
    }
});

module.exports = db;
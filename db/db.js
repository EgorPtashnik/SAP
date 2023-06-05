const sqlite3 = require("sqlite3");
const filepath = "./database.sqlite";

const Tables = require("./tables");

const db = new sqlite3.Database(filepath, err => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.info(`Connected to ${filepath}`);
        Tables.initialize(db);
    }
})

Tables.initialize(db);


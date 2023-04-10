const sqlite3 = require("sqlite3");
const filepath = "./db/todos.db";

const createTodoItemTable = (db) => {
    db.run(`CREATE TABLE TODOITEM (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        todo_title text,
        todo_description text,
        card_id INTEGER
    )`,
    (err) => {
        if (err) {
            // Table already created
        }
    });
};

const createTodoListTable = (db) => {
    db.run(`CREATE TABLE TODOLIST (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        card_title text
    )`,
    (err) => {
        if (err) {
            // Table already created
        }
    });
};

const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
        console.error(error.message);
        throw error;
    } else {
        console.info(`Connected to the SQLite database.`);
        createTodoListTable(db);
        createTodoItemTable(db);
    };
});

module.exports = db;
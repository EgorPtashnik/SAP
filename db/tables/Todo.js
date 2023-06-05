const sqlTodoList = `
    CREATE TABLE IF NOT EXISTS
    TODOLIST (
        id
            INTEGER
            PRIMARY KEY 
            AUTOINCREMENT,
        
        name
            TEXT,

        status
            INTEGER

        created_at
            TEXT,

        updated_at
            TEXT,

        category_id
            INTEGER
    )
`;

const sqlTodoItem = `
    CREATE TABLE IF NOT EXISTS
    TODOITEM (
        id
            INTEGER
            PRIMARY KEY 
            AUTOINCREMENT,
        
        name
            TEXT,

        description
            TEXT,

        status
            INTEGER,

        created_at
            TEXT,

        updated_at
            TEXT,

        dueDate
            TEXT,
        
        todolist_id
            INTEGER
    )
`;

const createTodoListTable = db => { db.run(sqlTodoList, err => {/* Table already created */}); };
const createTodoItemTable = db => { db.run(sqlTodoItem, err => {/* Table already created */}); };

module.exports = {
    createTodoListTable,
    createTodoItemTable
};

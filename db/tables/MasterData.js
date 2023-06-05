const sqlTodoListCategory = `
    CREATE TABLE IF NOT EXISTS
    TODOLISTCATEGORY (
        id
            INTEGER
            PRIMARY KEY 
            AUTOINCREMENT,
        
        category
            TEXT
    )
`;

const createTodoListCategoryTable = db => { db.run(sqlTodoListCategory, err => {/* Table already created */}); };

module.exports = {
    createTodoListCategoryTable
};

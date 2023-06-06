const sqlTodoListCategory = `
    CREATE TABLE
    TODOLISTCATEGORY (
        id
            INTEGER
            PRIMARY KEY 
            AUTOINCREMENT,
        
        category
            TEXT
    )
`;

const fs = require("fs");
const { parse } = require("csv-parse");

const createTodoListCategoryTable = db => { 
    db.run(sqlTodoListCategory, err => {
        if (!err) {
            fs.createReadStream("db/data/TodoListCategory.csv")
              .pipe(parse({ delimiter: ",", from_line: 2 }))
              .on("data", row => {
                console.error(row);
                const sqlInsertTodoListCategory = `
                    INSERT INTO TODOLISTCATEGORY
                        (ID, CATEGORY)
                    VALUES
                        (?, ?)
                `;
                const params = [row[0], row[1]];
                db.run(sqlInsertTodoListCategory, params);
              }); 
        }
    }); 
};

module.exports = {
    createTodoListCategoryTable
};

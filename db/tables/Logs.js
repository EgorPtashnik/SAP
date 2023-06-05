const sqlErrorLog = `
    CREATE TABLE IF NOT EXISTS
    ERRORLOG (
        id
            INTEGER
            PRIMARY KEY 
            AUTOINCREMENT,
        
        datetime
            TEXT,

        type
            TEXT,

        text
            TEXT
    )
`;

const createErrorLogTable = db => { db.run(sqlErrorLog, err => {/* Table already created */}); };

module.exports = {
    createErrorLogTable
};
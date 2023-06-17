const cds = require('@sap/cds');

module.exports = srv => {
    srv.on('CreateTodoCategory', async req => {
        try {
            const { name } = req.data;
            const db = srv.transaction(req);
            const { TodoCategory } = srv.entities;  
            await db.create(TodoCategory, { name: name });
        } catch(e) {
            console.error(e);
            throw new Error("Todo Category was not created");
        }
    });
}


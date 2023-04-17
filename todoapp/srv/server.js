const express = require("express");
const server = express();
const cors = require('cors');
const port = 4002 || process.eng.PORT;

const todos = require("./routes/todosRoute");
const todoLists = require("./routes/todoListsRoute");

server.use(cors());

server.use("/todos", todos);
server.use("/todoLists", todoLists);



server.listen(port, () => {
    console.log(`Server is listening ate http://localhost:${port}`);
});


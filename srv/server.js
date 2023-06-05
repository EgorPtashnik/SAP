const express = require("express");
const server = express();
const port = 4000 || process.env.PORT;

const TodoLists = require("./routes/todoList");

server.use("/todoLists", TodoLists);


server.listen(port, () => console.info(`Server's listening at http://localhost:${port}`));

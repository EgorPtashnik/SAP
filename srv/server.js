const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const port = 4000 || process.env.PORT;

const TodoLists = require("./routes/todoList");
const MasterData = require("./routes/masterData");

server.use(bodyParser.json());

server.use("/todoLists", TodoLists);
server.use("/masterData", MasterData);


server.listen(port, () => console.info(`Server's listening at http://localhost:${port}`));

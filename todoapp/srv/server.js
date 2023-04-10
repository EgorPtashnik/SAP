const express = require("express");
const server = express();
const port = 4002 || process.eng.PORT;

const todos = require("./routes/todosRoute");


server.use("/todos", todos);



server.listen(port, () => {
    console.log(`Server is listening ate http://localhost:${port}`);
});


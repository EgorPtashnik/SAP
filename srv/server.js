const express = require("express");
const server = express();
const port = 4000 || process.env.PORT;

server.listen(port, () => console.info(`Server's listening at http://localhost:${port}`));
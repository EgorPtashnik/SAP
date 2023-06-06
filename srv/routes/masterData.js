const express = require("express");
const MasterDataRouter = express.Router();
const MasterDataService = require("../services/masterData");

MasterDataRouter.use((req, res, next) => {
    console.info(`${req.baseUrl} Time: ${Date.now()}`);
    next();
});

MasterDataRouter.get("/Categories", (req, res) => {
    MasterDataService.getCategories(req, res);
});

MasterDataRouter.post("/Categories", (req, res) => {
    MasterDataService.createCategory(req, res);
});

module.exports = MasterDataRouter;
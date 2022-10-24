const express = require("express");
const router = express.Router();
const animalsApi = require("./animals");
const authRouter = require("./auth");
const propertiesRouter = require("./properties");

router.use("/auth", authRouter);
router.use("/animals", animalsApi);
router.use("/properties", propertiesRouter);
module.exports = router;

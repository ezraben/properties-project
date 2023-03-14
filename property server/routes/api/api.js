const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const propertiesRouter = require("./properties");

router.use("/auth", authRouter);

router.use("/properties", propertiesRouter);
module.exports = router;

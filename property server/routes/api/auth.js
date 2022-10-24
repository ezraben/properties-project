const express = require("express");
const router = express.Router();
const usersModule = require("../../models/users.model");
const userValidation = require("../../validation/user.validation");
const bcrypt = require("../../config/bcrypt");
const CustomMsg = require("../../classes/CustomMsg");
const jwt = require("../../config/jwt");

router.post("/signup", async (req, res) => {
  try {
    const validateValue = await userValidation.validateSignupSchema(req.body);
    const userData = await usersModule.selectUserByMail(validateValue.email);
    if (userData.length > 0) {
      throw new CustomMsg(CustomMsg.STATUSES.Failed, "email already exist");
    }

    const hashedPassword = await bcrypt.createHash(validateValue.password);
    const newUserData = await usersModule.insertUser(
      validateValue.firstName,
      validateValue.lastName,
      validateValue.email,
      hashedPassword,
      validateValue.phone
    );
    res.json(new CustomMsg(CustomMsg.STATUSES.Success, "User Created"));
  } catch (err) {
    res.json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const validatedValue = await userValidation.validateLoginSchema(req.body);
    const userData = await usersModule.selectUserByMail(validatedValue.email);
    if (userData.length <= 0) {
      throw new CustomMsg(
        CustomMsg.STATUSES.Failed,
        "invalid email or password"
      );
    }

    const hashResult = await bcrypt.compareHash(
      validatedValue.password,
      userData[0].password
    );
    if (!hashResult) {
      // throw { status: STATUSES.Failed", msg: "invalid email or password" };
      throw new CustomMsg(
        CustomMsg.STATUSES.Failed,
        "invalid email or password"
      );
    } else {
      let token = await jwt.generateToken({ email: userData[0].email });
      res.json(new CustomMsg(CustomMsg.STATUSES.Success, token));
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

module.exports = router;

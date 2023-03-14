const express = require("express");
const router = express.Router();
const usersModule = require("../../models/users.model");
const userValidation = require("../../validation/user.validation");

const bcrypt = require("../../config/bcrypt");
const CustomMsg = require("../../classes/CustomMsg");
const jwt = require("../../config/jwt");
const generateRandAlphaNum = require("../../util/randomAlphaNum");
const sendEmail = require("../../config/mailer");
const crypto = require("../../config/crypto");

router.post("/signup", async (req, res) => {
  try {
    const validatedValue = await userValidation.validateSignupSchema(req.body);

    const userData = await usersModule.selectUserByMail(validatedValue.email);

    if (userData.length > 0) {
      throw new CustomMsg(CustomMsg.STATUSES.Failed, "email already exist");
    }
    const hashedPassword = await bcrypt.createHash(validatedValue.password);

    const newUserData = await usersModule.insertUser(
      validatedValue.firstName,
      validatedValue.lastName,
      validatedValue.email,
      hashedPassword,
      validatedValue.phone,

      validatedValue.isAdmin
     
    );
    

    
    let token = await jwt.generateToken({ email: validatedValue.email });
    if (token) {
      res.json(new CustomMsg(CustomMsg.STATUSES.Success, token));
      return;
    }
    
  } catch (err) {
    console.log("err", err);

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
      
      throw new CustomMsg(
        CustomMsg.STATUSES.Failed,
        "invalid email or password"
      );
    }
   
    else {
      let token = await jwt.generateToken({ email: userData[0].email });
      const isAdmin = userData[0].isAdmin;

      res.json(new CustomMsg(CustomMsg.STATUSES.Success, token, isAdmin));
    }
   
  
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.post("/forgetPassword", async (req, res) => {
  try {
    const validatedValue =
      await userValidation.validateForgetPasswordSchemaSchema(req.body);
    const userData = await usersModule.selectUserByMail(validatedValue.email);
    if (userData.length <= 0) {
      throw new CustomMsg(
        CustomMsg.STATUSES.Success,
        "if the email exists, the  mail was sent"
      );
    }
    const secretKey = generateRandAlphaNum(8);

    const encryptedData = crypto.encrypt(validatedValue.email);
    
    const urlSecretKey = `http://localhost:3000/recoverPassword/${secretKey}/${encryptedData.iv}/${encryptedData.encryptedData}`;
    
    const expDate = new Date(Date.now() + 1800000);
    await usersModule.upDateRecovery(validatedValue.email, secretKey, expDate);
    sendEmail({
      from: process.env.EMAIL_EMAIL,
      to: validatedValue.email,
      subject: "Your recovery email",
      html: ` <h1>your recovery link</h1>
      <a href="${urlSecretKey}">click here to update your password</a>`,
    });
    res.json(
      new CustomMsg(
        CustomMsg.STATUSES.Success,
        "if the email exists, the  mail was sent"
      )
    );
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.post(
  "/recoverPassword/:secretKey/:iv/:encryptedData",
  async (req, res) => {
    try {
      const validatedValue =
        await userValidation.validateRecoveryPasswordSchema(req.body);
   
      const decryptedEmail = crypto.decrypt({
        iv: req.params.iv,
        encryptedData: req.params.encryptedData,
      });

    
      const validateEmail =
        await userValidation.validateRecoveryPasswordValidateEmailSchema({
          email: decryptedEmail,
        });
      const userData = await usersModule.selectUserByMail(
        
        validateEmail.email
      );
     
      if (userData.length <= 0) {
        throw new CustomMsg(CustomMsg.STATUSES.Failed, "something went wrong");
      }

      if (userData[0].recovery.secretKey !== req.params.secretKey) {
        throw new CustomMsg(CustomMsg.STATUSES.Failed, "Something went wrong");
      }
      const nowDT = new Date();
      /*get the date and time now and convert it to number
      get the exp date from database and convert it to number
      if the number from the db smaller then now then the revocery expired*/
      if (nowDT.getTime() > userData[0].recovery.dateRecovery.getTime()) {
        
        throw new CustomResponse(
          CustomResponse.STATUSES.fail,
          "something went wrong"
        );
      }

      const hashedPassword = await bcrypt.createHash(validatedValue.password);
      await usersModule.upDatePassword(validateEmail.email, hashedPassword);

      res.json(new CustomMsg(CustomMsg.STATUSES.Success, "Password updated"));
    } catch (err) {
      res.json(err);
    }
  }
);
module.exports = router;

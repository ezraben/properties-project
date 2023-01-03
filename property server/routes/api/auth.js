const express = require("express");
const router = express.Router();
const usersModule = require("../../models/users.model");
const userValidation = require("../../validation/user.validation");
const upLoadMulter = require("../../config/multer");
const bcrypt = require("../../config/bcrypt");
const CustomMsg = require("../../classes/CustomMsg");
const jwt = require("../../config/jwt");
const generateRandAlphaNum = require("../../util/randomAlphaNum");
const sendEmail = require("../../config/mailer");
const crypto = require("../../config/crypto");
/////////////////////
router.post("/signup", upLoadMulter.single("img"), async (req, res) => {
  console.log(req.file);
  try {
    const validatedValue = await userValidation.validateSignupSchema(req.body);
    console.log("validatedValue", validatedValue);
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
      req.file.filename,
      // req.file,
      validatedValue.phone,
      validatedValue.isAdmin
    );
    // console.log("req.file", req.file);
    let token = await jwt.generateToken({ email: validatedValue.email });
    if (token) {
      res.json(new CustomMsg(CustomMsg.STATUSES.Success, token));
      return;
    }
    // res.json(
    //   new CustomMsg(CustomMsg.STATUSES.Success, "new user created")
    //   // new CustomResponse(CustomResponse.STATUSES.ok, "new user created")
    // );
  } catch (err) {
    console.log("err", err);

    res.json(err);
  }
});

////////////////////////////////

//from here working singup before changing for up loading pfofile pi with multer

// router.post("/signup", async (req, res) => {
//   try {
//     const validatedValue = await userValidation.validateSignupSchema(req.body);
//     console.log("validatedValue", validatedValue);
//     const userData = await usersModule.selectUserByMail(validatedValue.email);

//     if (userData.length > 0) {
//       throw new CustomMsg(CustomMsg.STATUSES.Failed, "email already exist");
//     }
//     const hashedPassword = await bcrypt.createHash(validatedValue.password);
//     const newUserData = await usersModule.insertUser(
//       validatedValue.firstName,
//       validatedValue.lastName,
//       validatedValue.email,
//       hashedPassword,
//       validatedValue.phone,
//       validatedValue.isAdmin
//     );
//     let token = await jwt.generateToken({ email: validatedValue.email });
//     if (token) {
//       res.json(new CustomMsg(CustomMsg.STATUSES.Success, token));
//       return;
//     }
//     // res.json(
//     //   new CustomMsg(CustomMsg.STATUSES.Success, "new user created")
//     //   // new CustomResponse(CustomResponse.STATUSES.ok, "new user created")
//     // );
//   } catch (err) {
//     console.log("err", err);

//     res.json(err);
//   }
// });
//////////////////////////////////////////////////
//until here working singup before changing for up loading pfofile pi with multer

////////////////

// router.post("/signup", async (req, res) => {
//   try {
//     const validateValue = await userValidation.validateSignupSchema(req.body);
//     const userData = await usersModule.selectUserByMail(validateValue.email);
//     if (userData.length > 0) {
//       throw new CustomMsg(CustomMsg.STATUSES.Failed, "email already exist");
//     }

//     console.log("validateValue", validateValue);

//     const hashedPassword = await bcrypt.createHash(validateValue.password);

//     const newUserData = await usersModule.insertUser(
//       validateValue.firstName,
//       validateValue.lastName,
//       validateValue.email,
//       hashedPassword,
//       validateValue.phone,
//       validateValue.isAdmin
//     );
////////////////////////////////////////////
// test test tset tset tste tste tste tstevtset

// let token = await jwt.generateToken;
// console.log(token);
// let token = await jwt.generateToken({ email: newUserData.email });
// console.log(token);

////////////////
// let token = await jwt.generateToken({ email: validateValue.email });
// if (token) {
//   res.json(new CustomMsg(CustomMsg.STATUSES.Success, token));
//   return;
// }

//////////
// TEST TTESTE TTEST

//     res.json(new CustomMsg(CustomMsg.STATUSES.Success, "User Created"));
//   } catch (err) {
//     res.json(err);
//   }
// });
// TEST TTESTE TTEST

// router.post("/signup", async (req, res) => {
//   try {
//     const validateValue = await userValidation.validateSignupSchema(req.body);
//     const userData = await usersModule.selectUserByMail(validateValue.email);
//     // res.json(validateValue.email);
//     if (userData.length > 0) {
//       throw new CustomMsg(CustomMsg.STATUSES.Failed, "email already exist");
//     }

//     const hashedPassword = await bcrypt.createHash(validateValue.password);
//     const newUserData = await usersModule.insertUser(
//       validateValue.firstName,
//       validateValue.lastName,
//       validateValue.email,
//       hashedPassword,
//       validateValue.phone,
//       validateValue.isAdmin
//     );
//     let token = await jwt.generateToken({ email: validateValue.email });
//     if (token) {
//       res.json(new CustomMsg(CustomMsg.STATUSES.Success, token));
//       return;
//       // return res.json(token);
//     }

//     // console.log(token);
//     // let token = await jwt.generateToken({ email: newUserData[0].email });

//     res.json(new CustomMsg(CustomMsg.STATUSES.Success, "User Created"));
//   } catch (err) {
//     res.json(err);
//   }
// });
//until here old singup

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
      const isAdmin = userData[0].isAdmin;

      res.json(new CustomMsg(CustomMsg.STATUSES.Success, token, isAdmin));
    }

    ///////////////////
    ////////////////
    //befro addind is admin
    //  else {
    //   let token = await jwt.generateToken({ email: userData[0].email });
    //   const isAdmin = userData[0].isAdmin;

    //   res.json(new CustomMsg(CustomMsg.STATUSES.Success, token));
    // }
    ///////////////////
    ////////////////
    //befro addind is admin
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
    // const urlSecretKey = `http://localhost:3000/recoverPassword/${secretKey}/${validatedValue.email}`;
    const urlSecretKey = `http://localhost:3000/recoverPassword/${secretKey}/${encryptedData.iv}/${encryptedData.encryptedData}`;
    // const urlSecretKey = `http://localhost:${process.env.PORT}/api/recoverPassword/${secretKey}`;
    const expDate = new Date(Date.now() + 1800000);
    await usersModule.upDateRecovery(validatedValue.email, secretKey, expDate);
    sendEmail({
      from: process.env.EMAIL_EMAIL,
      to: validatedValue.email,
      subject: "Your recovery email",
      html: ` <h1>your recovery link</h1>
      <a href="${urlSecretKey}">here</a>`,
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
      /*
      get data from params 
      decrypt the data from the params
      if ti success then we will get email
      else we will get @#$%^ gibrish
      */
      const decryptedEmail = crypto.decrypt({
        iv: req.params.iv,
        encryptedData: req.params.encryptedData,
      });

      /*
      \check if it success or fail
        
       */
      const validateEmail =
        await userValidation.validateRecoveryPasswordValidateEmailSchema({
          email: decryptedEmail,
        });
      const userData = await usersModule.selectUserByMail(
        // req.params.encryptedEmail
        validateEmail.email
      );
      console.log("decryptedEmail", decryptedEmail);
      console.log("validateEmail", validateEmail);
      console.log("userData", userData);
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
        // if (nowDT.getTime() > usersData[0].recovery.dateRecovery.getTime()) {
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

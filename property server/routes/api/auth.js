const express = require("express");
const router = express.Router();
const usersModule = require("../../models/users.model");
const userValidation = require("../../validation/user.validation");
const upLoadMulter = require("../../config/multer");
const bcrypt = require("../../config/bcrypt");
const CustomMsg = require("../../classes/CustomMsg");
const jwt = require("../../config/jwt");
const generateRandAlphaNum = require("../../util/randomAlphaNum");
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
      res.json(new CustomMsg(CustomMsg.STATUSES.Success, token));
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
        CustomMsg.STATUSES.Failed,
        "if the email exists, the  mail was sent"
      );
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

module.exports = router;

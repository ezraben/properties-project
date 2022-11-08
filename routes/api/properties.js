const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
// const multerConfig = multer.c;
const upLoadMulter = require("../../config/multer");
const CustomMsg = require("../../classes/CustomMsg");

const Properties = require("../../models/properties.model");
const propertiesModel = require("../../models/properties.model");
// const {
//   Properties,
//   propertiesModel,
// } = require("../../models/properties.model");
const propertiesValidation = require("../../validation/property.validation");

// from here multer until where i start CRUD

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  fileaddress: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldaddress + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("propertyImg"), async (req, res) => {
  // router.post("/properties", upload.single("propertyImg"), async (req, res) => {
  try {
    const validateValue = await propertiesValidation.validatePropertySchema(
      req.body
    );
    if (validateValue) {
      console.log(validateValue);

      const newUserData = await propertiesModel.insertProperty(
        // const newUserData = await propertiesModel.insertProperty(
        // validateValue.img,
        validateValue.price,
        validateValue.description,
        validateValue.address
      );
      res.json("property created successfully");
    }
    console.log(req.body);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//ffrom here befor changes on multer on the flight
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads");
//   },
//   fileaddress: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldaddress + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });

// router.post("/properties", upload.single("propertyImg"), async (req, res) => {
//   try {
//     const validateValue = await propertiesValidation.validatePropertySchema(
//       req.body
//     );

//     if (validateValue) {
//       const newUserData = await propertiesModel.insertProperty(
//         validateValue.img,
//         validateValue.price,
//         validateValue.description,
//         validateValue.address
//       );
//       res.json("property created successfully");
//     }
//     console.log(req.body);
//   } catch (err) {
//     res.json(err);
//   }
// });

///////////////////////////////////////
// until here multer, from here CRUD
router.get("/", async (req, res) => {
  try {
    const properties = await propertiesModel.selectAllProperties();
    res.json(properties);
  } catch (err) {
    res.json(err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const id = req.query._id;
    const validateValue = await propertiesValidation.validatePropertySchema(
      req.body
    );
    if (validateValue) {
      const newUserData = await Properties.findByIdAndUpdate(
        id,

        {
          price: validateValue.price,
          description: validateValue.description,
          address: validateValue.address,
          img: validateValue.img,
        }
      );
      res.json("property upDated  successfully");
    }
    console.log(req.body);
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const _id = req.query;
  console.log("req1", req.query);
  try {
    console.log("_id", _id);
    const property = await propertiesModel.deleteProperty(_id._id);

    res.json(property);

    if (property) {
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

module.exports = router;

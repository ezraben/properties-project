const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const multer = require("multer");

// const upLoadMulter = multer({ dest: "uploads/" });
const upLoadMulter = require("../../config/multer");
// const upLoadMulter = require("../../config/multer");
const CustomMsg = require("../../classes/CustomMsg");

const Properties = require("../../models/properties.model");
const propertiesModel = require("../../models/properties.model");

const propertiesValidation = require("../../validation/property.validation");

// from here multer until where i start CRUD

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

// until here working up load also with react - not mullter
///////////////////////////////////////////
// router.post("/", upload.single("propertyImg"), async (req, res) => {
//   // router.post("/properties", upload.single("propertyImg"), async (req, res) => {
//   try {
//     const validateValue = await propertiesValidation.validatePropertySchema(
//       req.body
//     );
//     if (validateValue) {
//       console.log(validateValue);

//       const newUserData = await propertiesModel.insertProperty(
//         // const newUserData = await propertiesModel.insertProperty(
//         // validateValue.img,
//         validateValue.price,
//         validateValue.description,
//         validateValue.address
//       );
//       res.json("property created successfully");
//     }
//     console.log(req.body);
//   } catch (err) {
//     console.log(err);
//     res.json(err);
//   }
// });
// until here working up load also with react - not mullter
///////////////////////////////////////////

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
/////////////////////////////////////////////
//ipi tyhat works with react but no multer
// router.post("/", upload.single("propertyImg"), async (req, res) => {
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
//     console.log(err);
//   }
// });
////////////////////////////////////////////////////
//until here ipi hat works with react but no multer

router.post("/", upLoadMulter.single("propertyImg"), async (req, res) => {
  try {
    const validateValue = await propertiesValidation.validatePropertySchema(
      req.body
    );

    if (validateValue) {
      const newUserData = await propertiesModel.insertProperty(
        req.file.filename,
        validateValue.price,
        validateValue.description,
        validateValue.address
        // validateValue.img
        // req.file.filename
        // validateValue.propertyImg,
        // validateValue.price,
        // validateValue.description,
        // validateValue.address
        // req.file.filename
      );
      console.log("req.file", req.file);
      res.json("property created successfully");
    }
    console.log(req.body);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

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
router.post("/filter", async (req, res) => {
  try {
    // const filterBy = { address: req.body };

    const properties = await propertiesModel.selectPropertyByAddress({
      // searchInpt: req.body.searchInpt,
      address: req.body.address,
    });
    // const properties = await propertiesModel.selectPropertyByAddress({
    //   // searchInpt: req.body.searchInpt,
    //   address: req.body.address,
    // });
    console.log(properties);
    console.log(req.body);

    res.json(properties);
  } catch (err) {
    res.json(err);
  }
});
// router.get("/filter", async (req, res) => {
//   try {
//     // const filterBy = { address: req.body };

//     const properties = await propertiesModel.selectPropertyByAddress({
//       address: req.body.address,
//     });

//     res.json(properties);
//   } catch (err) {
//     res.json(err);
//   }
// });
router.post("/filterByPrice", async (req, res) => {
  try {
    // const filterBy = { address: req.body };

    const properties = await propertiesModel.selectPropertyByMaxPrice({
      price: req.body.price,
    });

    res.json(properties);
  } catch (err) {
    res.json(err);
  }
});
router.post("/filterByMinPrice", async (req, res) => {
  try {
    // const filterBy = { address: req.body };

    const properties = await propertiesModel.selectPropertyByMinPrice({
      price: req.body.price,
    });

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

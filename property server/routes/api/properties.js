const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// const multer = require("multer");

// const upLoadMulter = multer({ dest: "uploads/" });
const upLoadMulter = require("../../config/multer");
// const upLoadMulter = require("../../config/multer");
// const CustomMsg = require("../../classes/CustomMsg");

const Properties = require("../../models/properties.model");
const propertiesModel = require("../../models/properties.model");
const usersModel = require("../../models/users.model");

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

////////////////////////////////////?
//from here trying to add url for property img - taking off multer
router.post("/", async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    console.log(userEmail);
    if (!req.body.img) {
      req.body.img =
        // req.body.img ??
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    }

    const validateValue = await propertiesValidation.validatePropertySchema(
      req.body
    );

    if (validateValue) {
      const newUserData = await propertiesModel.insertProperty(
        // req.file.filename,
        validateValue.price,
        validateValue.description,
        validateValue.city,
        validateValue.address,
        validateValue.img,
        userEmail,
        validateValue.extraInfo

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
////////////////////////////////////?
//until here trying to add url for property img - taking off multer
//////////////////////////////!
// router.post("/", upLoadMulter.single("propertyImg"), async (req, res) => {
//   try {
//     const userEmail = req.query.userEmail;

//     const validateValue = await propertiesValidation.validatePropertySchema(
//       req.body
//     );

//     if (validateValue) {
//       const newUserData = await propertiesModel.insertProperty(
//         // req.file.filename,
//         validateValue.price,
//         validateValue.description,
//         validateValue.address,
//         userEmail

//         // validateValue.img
//         // req.file.filename
//         // validateValue.propertyImg,
//         // validateValue.price,
//         // validateValue.description,
//         // validateValue.address
//         // req.file.filename
//       );
//       console.log("req.file", req.file);
//       res.json("property created successfully");
//     }
//     console.log(req.body);
//   } catch (err) {
//     res.json(err);
//     console.log(err);
//   }
// });

///////////////////////////////////////
// until here multer, from here CRUD
router.get("/", async (req, res) => {
  try {
    console.log("req.query", req.query);
    const properties = await propertiesModel.selectPropertyByUser({
      userEmail: req.query.userEmail,
    });

    res.json(properties);
  } catch (err) {
    res.json(err);
  }
});
//////////////////
// get all  cards !!works
router.get("/allCards", async (req, res) => {
  try {
    const properties = await propertiesModel.selectAllProperties();
    res.json(properties);
  } catch (err) {
    res.json(err);
  }
});
//////////////////
// get all  cards !!works
router.get("/specificProperty", async (req, res) => {
  try {
    const id = req.query.id;
    const property = await propertiesModel.selectPropertyById(id);
    console.log("property", property);

    res.json(property);
  } catch (err) {
    res.json(err);
  }
});

router.post("/filterByCity", async (req, res) => {
  try {
    const properties = await propertiesModel.selectPropertyByCity({
      city: req.body.city,
    });

    console.log(properties);
    console.log(req.body);

    res.json(properties);
  } catch (err) {
    // try {
    //   const properties = await propertiesModel.selectPropertyByAddress({
    //     address: req.body.address,
    //   });

    //   console.log(properties);
    //   console.log(req.body);

    //   res.json(properties);
    // }
    res.json(err);
  }
});

router.post("/filterByMaxPrice", async (req, res) => {
  try {
    // const filterBy = { address: req.body };

    const properties = await propertiesModel.selectPropertyByMaxPrice({
      price: req.body.maxPrice,
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
      price: req.body.minPrice,
    });

    res.json(properties);
  } catch (err) {
    res.json(err);
  }
});

///////////////////////////////////////////

router.put(
  "/:id/:price/:description/:city/:address/:extraInfo",
  async (req, res) => {
    //   // router.put("/:id/:price/:description/:address", async (req, res) => {
    try {
      const id = req.params.id;
      const data = {
        price: req.params.price,
        description: req.params.description,
        city: req.params.city,
        address: req.params.address,
        extraInfo: req.params.extraInfo,
      };

      const validateValue = await propertiesValidation.validatePropertySchema(
        // req.body
        data
      );

      if (validateValue) {
        const newUserData = await propertiesModel.findByIdAndUpdate(
          id,
          validateValue.price,
          validateValue.description,
          validateValue.city,
          validateValue.address,
          validateValue.extraInfo
          // validateValue.img,
        );
        console.log("newUserData", newUserData);

        res.json("property upDated  successfully");
      }
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  }
);

router.delete("/:id", async (req, res) => {
  const _id = req.params.id;
  console.log("req1", req.query);
  try {
    console.log("_id", _id);

    const property = await propertiesModel.deleteProperty(_id);

    res.json(property);

    if (property) {
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.get("/likedProperties/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);

    const property = await propertiesModel.selectPropertyById({
      _id: req.params.id,
    });
    res.json(property);
    console.log(property);
    ////////////////////////
    //from here adding property to data base affter we got the id
    if (property != 0) {
      console.log("euston we got a property");
    }
    ////////////////////////
    //until here adding property to data base affter we got the id

    if (!property) {
      res.json({ msg: "cant find card" });
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

/////////////////////////////////////////////
//rout works, not yet with react
router.post(`/addLikedPropertyId`, async (req, res) => {
  try {
    console.log("routes works");
    const id = req.query.id;
    const email = req.query.email;
    console.log("req.query", req.query);

    const usersModell = await usersModel.addLickedProperty(id, email);

    // res.json({ id, email });
    res.json({ usersModell });
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});
router.get("/lickedPropertiesByUser", async (req, res) => {
  try {
    const user = await usersModel.selectUserByMail(req.query.email);

    console.log("req.query.email", req.query.email);
    // res.json(user);
    const properties = user[0].likedProperties;
    console.log("user[0].likedProperties", user[0].likedProperties);

    // res.json(properties);
    // }
    // catch (err) {
    //   console.log(err);
    //   res.json(err);
    // }
    // });
    // router.get("/getLickedPropertiesById", async (req, res) => {
    // try {
    console.log("this is working");
    console.log("req.query", req.query);
    ///////////////////////////////

    const propertyById = await propertiesModel.selectPropertyById(properties);
    // const propertyById = await propertiesModel.selectPropertyById(req.query.id);
    res.json(propertyById);
    console.log("propertyById", propertyById);
  } catch (err) {
    res.json(err);
    console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", err);
  }
});

router.put("/removeFavoriteProp/:id", async (req, res) => {
  const _id = req.query.id;
  const email = req.query.email;
  console.log("req1", req.query);
  try {
    console.log("_id pased drom react", _id);
    console.log("email pased from react", email);

    const property = await usersModel.removeLickedProperty(_id, email);

    if (!property) {
      res.json("cant find the card");
    }

    // res.json(property);
    res.json(property);
    console.log(property);

    // if (property) {
    // }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

module.exports = router;

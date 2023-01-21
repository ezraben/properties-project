const { query } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const upLoadMulter = require("../../config/multer");

const Properties = require("../../models/properties.model");
const propertiesModel = require("../../models/properties.model");
const usersModel = require("../../models/users.model");

const propertiesValidation = require("../../validation/property.validation");

router.post("/", async (req, res) => {
  try {
    const userEmail = req.query.userEmail;
    console.log(userEmail);
    if (!req.body.img) {
      req.body.img =
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    }

    const validateValue = await propertiesValidation.validatePropertySchema(
      req.body
    );

    if (validateValue) {
      const newUserData = await propertiesModel.insertProperty(
        validateValue.price,
        validateValue.description,
        validateValue.city,
        validateValue.address,
        validateValue.img,
        userEmail,
        validateValue.extraInfo
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

router.get("/allCards", async (req, res) => {
  try {
    const properties = await propertiesModel.selectAllProperties();
    res.json(properties);
  } catch (err) {
    res.json(err);
  }
});

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
    res.json(err);
  }
});

router.post("/filterByMaxPrice", async (req, res) => {
  try {
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
    const properties = await propertiesModel.selectPropertyByMinPrice({
      price: req.body.minPrice,
    });

    res.json(properties);
  } catch (err) {
    res.json(err);
  }
});

router.put(
  "/:id/:price/:description/:city/:address/:extraInfo",
  async (req, res) => {
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

    if (property != 0) {
      console.log("euston we got a property");
    }

    if (!property) {
      res.json({ msg: "cant find card" });
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.post(`/addLikedPropertyId`, async (req, res) => {
  try {
    console.log("routes works");
    const id = req.query.id;
    const email = req.query.email;
    console.log("req.query", req.query);

    const usersModell = await usersModel.addLickedProperty(id, email);

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

    const properties = user[0].likedProperties;
    console.log("user[0].likedProperties", user[0].likedProperties);

    console.log("this is working");
    console.log("req.query", req.query);
    ///////////////////////////////

    const propertyById = await propertiesModel.selectPropertyById(properties);

    res.json(propertyById);
    console.log("propertyById", propertyById);
  } catch (err) {
    res.json(err);
    console.log("err", err);
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

    res.json(property);
    console.log(property);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

module.exports = router;

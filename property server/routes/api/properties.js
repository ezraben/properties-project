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

      res.json("property created successfully");
    }
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
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

  try {
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

    const property = await propertiesModel.selectPropertyById({
      _id: req.params.id,
    });
    res.json(property);

    if (property != 0) {
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
    const id = req.query.id;
    const email = req.query.email;

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

    const properties = user[0].likedProperties;

    const propertyById = await propertiesModel.selectPropertyById(properties);

    res.json(propertyById);
  } catch (err) {
    res.json(err);
    console.log("err", err);
  }
});

router.put("/removeFavoriteProp/:id", async (req, res) => {
  const _id = req.query.id;
  const email = req.query.email;

  try {
    const property = await usersModel.removeLickedProperty(_id, email);

    if (!property) {
      res.json("cant find the card");
    }

    res.json(property);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

module.exports = router;

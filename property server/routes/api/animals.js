const { json } = require("express");
const express = require("express");
const router = express.Router();

const animals = [];
router.get("/allAnimals", (req, res) => {
  res.json(animals);
});
router.patch("/editeAnimal", (req, res) => {
  let animal = animals.find((item) => {
    item === req.body._id;
  });
  if (animal.name === req.body._name) {
    res.json({ msg: "ok" });
  } else {
    res.json({ msg: "not ok" });
  }
});

router.post("/adAnimal", (req, res) => {
  animals.push(req.body);
  res.json({ msg: "animal add" });
});

module.exports = router;

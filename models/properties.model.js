const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* create user schema */ const propertiesSchema = new Schema({
  // img: { type: Image, required: false },
  // img: { type: String, required: false },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
});

//create conllection
//all the mulipulation on the documents will be using this object
const Properties = mongoose.model("Properties", propertiesSchema);
//this function will create new user
const insertProperty = (price, description, address) => {
  const property = new Properties({ price, description, address });
  return property.save();
};

const selectAllProperties = () => {
  return Properties.find();
};

const selectPropertyById = (_id) => {
  return Properties.find({ _id });
};

const deleteProperty = (_id) => {
  return Properties.findOneAndDelete({ _id });
};

module.exports = {
  Properties,
  insertProperty,
  selectAllProperties,
  selectPropertyById,
  deleteProperty,
};

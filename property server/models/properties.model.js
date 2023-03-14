const mongoose = require("mongoose");
const usersModel = require("../models/users.model");
const Schema = mongoose.Schema;
const propertiesSchema = new Schema({
  price: { type: Number, required: true },
  description: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  img: { type: String, required: false },
  userEmail: { type: String, required: true },
  extraInfo: { type: String, required: true },
});

const Properties = mongoose.model("Properties", propertiesSchema);

const insertProperty = (
  price,
  description,
  city,
  address,
  img,
  userEmail,
  extraInfo
) => {
  const property = new Properties({
    price,
    description,
    city,
    address,
    img,
    userEmail,
    extraInfo,
  });

  return property.save();
};

const selectAllProperties = () => {
  return Properties.find();
};

const selectPropertyByUser = (filter) => {
  
  return Properties.find({ userEmail: { $eq: filter.userEmail } });
};
const selectPropertyByCity = (filter) => {
  return Properties.find({ city: { $eq: filter.city } });
};

const selectPropertyByMaxPrice = (filter) => {
  return Properties.find({ price: { $lte: filter.price } });
};

const selectPropertyByMinPrice = (filter) => {
  return Properties.find({ price: { $gte: filter.price } });
};

const selectPropertyById = (_id) => {
  return Properties.find({ _id });
};

const deleteProperty = (_id) => {
  return Properties.findOneAndDelete({ _id });
};

const findByIdAndUpdate = (
  _id,
  price,
  description,
  city,
  address,
  
  extraInfo
) => {
  return Properties.findByIdAndUpdate(_id, {
    price: price,
    description: description,
    city: city,
    address: address,
    
    extraInfo: extraInfo,
  });
};

module.exports = {
  Properties,
  insertProperty,
  selectAllProperties,
  selectPropertyById,
  deleteProperty,
  selectPropertyByMaxPrice,
  selectPropertyByMinPrice,
  selectPropertyByUser,

  findByIdAndUpdate,
  selectPropertyByCity,
};

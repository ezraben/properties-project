const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* create user schema */ const propertiesSchema = new Schema({
  // img: { type: Image, required: false },
  // img: { type: String },

  price: { type: Number, required: true },
  description: { type: String, required: true },
  address: { type: String, required: true },
});

//create conllection
//all the mulipulation on the documents will be using this object
const Properties = mongoose.model("Properties", propertiesSchema);
//this function will create new user

const insertProperty = (price, description, address) => {
  const property = new Properties({
    // img:
    //   req.body.img ??
    //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    // img,

    price,
    description,
    address,
  });

  return property.save();
};

//////////////////////////////////////////////////
// from here up loading property with img from multer on html work--- nor react
// const Schema = mongoose.Schema;
// /* create user schema */ const propertiesSchema = new Schema({
//   // img: { type: Image, required: false },
//   img: { type: String },
//   price: { type: Number, required: true },
//   description: { type: String, required: true },
//   address: { type: String, required: true },
// });

// //create conllection
// //all the mulipulation on the documents will be using this object
// const Properties = mongoose.model("Properties", propertiesSchema);
// //this function will create new user
// const insertProperty = (img, price, description, address) => {
//   const property = new Properties({
//     // img:
//     //   req.body.img ??
//     //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//     img,

//     price,
//     description,
//     address,
//   });

//   return property.save();
// };

const selectAllProperties = () => {
  return Properties.find();
};

/////////////////
//from here old find ny id
// const selectPropertyById = (_id) => {
//   return Properties.find({ _id });
// };
/////////////////
//intil here old find ny id
const selectPropertyByAddress = (filter) => {
  return Properties.find({ address: { $eq: filter.address } });
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
// const selectPropertyById = (_id) => {
//   return Properties.find({ _id });
// };

const deleteProperty = (_id) => {
  return Properties.findOneAndDelete({ _id });
};
// const findByIdAndUpdate = (_id) => {
//   const data = { price: price, description: description, address: address };
//   return Properties.findByIdAndUpdate(_id, {
//     data,
//   });
// };
///////////////////////////
// from  here  before lady dlaat changes  --  was working almost
// const findByIdAndUpdate = (_id, price, description, address) => {
//   // data = { price: price, description: description, address: address };

//   return Properties.findByIdAndUpdate(_id, {
//     price: price,
//     description: description,
//     address: address,
//   });
// };
///////////////////////////
// until here  before lady dlaat changes --  was working almost
//////////////////////////////////////
// dwon from here works on postman
const findByIdAndUpdate = (_id, price, description, address) => {
  return Properties.findByIdAndUpdate(_id, {
    price: price,
    description: description,
    address: address,
  });
};
//////////////////////////////////////////
// until from here works on postman

module.exports = {
  Properties,
  insertProperty,
  selectAllProperties,
  selectPropertyById,
  deleteProperty,
  selectPropertyByAddress,
  selectPropertyByMaxPrice,
  selectPropertyByMinPrice,
  findByIdAndUpdate,
};

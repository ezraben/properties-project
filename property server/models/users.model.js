const { array } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* create user schema */ const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // confirmPassword: { type: String, required: true },

  img: { type: String },

  phone: { type: String },
  // isAdmin: { type: Boolean },
  // isAdmin: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  // likedProperties: { type: Array },
  recovery: {
    secretKey: { type: String },
    dateRecovery: { type: Date },
  },
});

//create conllection
//all the mulipulation on the documents will be using this object
const Users = mongoose.model("Users", usersSchema);
//this function will create new user
const insertUser = (
  firstName,
  lastName,
  email,
  password,
  // confirmPassword,
  img,
  phone,
  isAdmin
) => {
  const user = new Users({
    firstName,
    lastName,
    email,
    password,
    // confirmPassword,
    img,
    phone,
    isAdmin,
  });
  return user.save();
};

const upDateRecovery = (email, key, date) => {
  return Users.updateOne(
    { email },
    { "recovery.secretKey": key, "recovery.dateRecovery": date }
  );
};
const upDatePassword = (email, password) => {
  return Users.updateOne({ email }, { password, "recovery.secretKey": "" });
};

const selectUserByMail = (email) => {
  return Users.find({ email });
};
module.exports = {
  insertUser,
  selectUserByMail,
  upDateRecovery,
  upDatePassword,
};

//////////////////////////////////////////////////
//from here before changes for adding liked property

// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// /* create user schema */ const usersSchema = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   // confirmPassword: { type: String, required: true },

//   img: { type: String },

//   phone: { type: String },
//   // isAdmin: { type: Boolean },
//   // isAdmin: { type: String, required: true },
//   isAdmin: { type: Boolean, required: true, default: false },
//   recovery: {
//     secretKey: { type: String },
//     dateRecovery: { type: Date },
//   },
// });

// //create conllection
// //all the mulipulation on the documents will be using this object
// const Users = mongoose.model("Users", usersSchema);
// //this function will create new user
// const insertUser = (
//   firstName,
//   lastName,
//   email,
//   password,
//   // confirmPassword,
//   img,
//   phone,
//   isAdmin
// ) => {
//   const user = new Users({
//     firstName,
//     lastName,
//     email,
//     password,
//     // confirmPassword,
//     img,
//     phone,
//     isAdmin,
//   });
//   return user.save();
// };

// const upDateRecovery = (email, key, date) => {
//   return Users.updateOne(
//     { email },
//     { "recovery.secretKey": key, "recovery.dateRecovery": date }
//   );
// };
// const upDatePassword = (email, password) => {
//   return Users.updateOne({ email }, { password, "recovery.secretKey": "" });
// };

// const selectUserByMail = (email) => {
//   return Users.find({ email });
// };
// module.exports = {
//   insertUser,
//   selectUserByMail,
//   upDateRecovery,
//   upDatePassword,
// };

//////////////////////////////////////////////////
//until here before changes for adding liked property

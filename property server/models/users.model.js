const { array } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  phone: { type: String },

  isAdmin: { type: Boolean, required: true, default: false },
  likedProperties: { type: Array },
  recovery: {
    secretKey: { type: String },
    dateRecovery: { type: Date },
  },
});

const Users = mongoose.model("Users", usersSchema);

const insertUser = (
  firstName,
  lastName,
  email,
  password,

  phone,

  isAdmin,
  likedProperties
) => {
  const user = new Users({
    firstName,
    lastName,
    email,
    password,

    phone,

    isAdmin,
    likedProperties,
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

const addLickedProperty = (id, email) => {
  return Users.updateOne({ email: email }, { $push: { likedProperties: id } });
};
const removeLickedProperty = (id, email) => {
  return Users.updateOne({ email: email }, { $pull: { likedProperties: id } });
};

module.exports = {
  insertUser,
  selectUserByMail,
  upDateRecovery,
  upDatePassword,
  addLickedProperty,
  removeLickedProperty,
};

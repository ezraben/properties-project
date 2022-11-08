const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* create user schema */ const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // confirmPassword: { type: String, required: true },

  phone: { type: String },
  // isAdmin: { type: Boolean },
  isAdmin: { type: Boolean, required: true, default: false },
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
  phone,
  isAdmin
) => {
  const user = new Users({
    firstName,
    lastName,
    email,
    password,
    // confirmPassword,
    phone,
    isAdmin,
  });
  return user.save();
};

const selectUserByMail = (email) => {
  return Users.find({ email });
};
module.exports = { insertUser, selectUserByMail };

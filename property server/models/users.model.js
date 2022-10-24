const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* create user schema */ const usersSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
});

//create conllection
//all the mulipulation on the documents will be using this object
const Users = mongoose.model("Users", usersSchema);
//this function will create new user
const insertUser = (firstName, lastName, email, password, phone) => {
  const user = new Users({ firstName, lastName, email, password, phone });
  return user.save();
};

const selectUserByMail = (email) => {
  return Users.find({ email });
};
module.exports = { insertUser, selectUserByMail };

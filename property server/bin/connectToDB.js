const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// module.exports = process.env.MONGO_CONNECTION_STRING;

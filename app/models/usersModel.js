const { mongoose } = require("mongoose");

const UsersModel = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UsersModel);

const mongoose = require("mongoose");
const validatorModule = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(email) {
        return validatorModule.isEmail(email);
      },
      message: (props) => `${props.value} не является электронной почтой!`,
    },
  },
}, { versionKey: false });

module.exports = mongoose.model("user", userSchema);

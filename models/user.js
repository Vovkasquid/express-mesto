const mongoose = require("mongoose");
const validatorModule = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => {
        return validatorModule.isEmail(email);
      },
      message: (props) => `${props.value} не является электронной почтой!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
  },
}, { versionKey: false });

module.exports = mongoose.model("user", userSchema);

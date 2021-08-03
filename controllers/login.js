const bcrypt = require("bcryptjs"); // импортируем bcrypt
const jwt = require("jsonwebtoken"); // импортируем модуль jsonwebtoken
const User = require("../models/user");

const ERROR_CODE_UNAUTHORIZED = 401;
const ERROR_CODE_DEFAULT_ERROR = 500;

const checkLogin = (req, res) => {
  console.log("внутри ЧекЛогин");
  const { email, password } = req.body;
  console.log("мыло и пароль = ", email, password);
  User.findOne({ email })
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error(`Пользователь с email: ${email} не существует`);
      error.statusCode = ERROR_CODE_UNAUTHORIZED;
      throw error;
    })
    .then((user) => {
      // Надо проверить пароль
      console.log("Внутри ФайнВан");
      bcrypt.compare(password, user.password)
        .then((matched) => {
          console.log("Matched = ", matched);
          if (!matched) {
            // Если мы здесь, значит Хэши не совпали. Бросаем ошибку и уходим в catch
            const error = new Error("Введён неправильный пароль");
            error.statusCode = ERROR_CODE_UNAUTHORIZED;
            throw error;
          }
          // Необходимо создать токен и отправить его пользователю
          const token = jwt.sign({ _id: user._id }, "strongest-key-ever", { expiresIn: "7d" });
          res.send({ token });
        })
        .catch(() => res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" }));
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_UNAUTHORIZED) {
        res.status(ERROR_CODE_UNAUTHORIZED).send({ message: err.message });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

module.exports = checkLogin;

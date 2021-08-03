const bcrypt = require("bcryptjs"); // импортируем bcrypt
const User = require("../models/user");

const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_DEFAULT_ERROR = 500;
const ERROR_CODE_CONFLICT = 409;

// колбек для получения всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => {
      res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
    });
};

// колбек для получения определённого пользователя
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error("Пользователь по заданному ID отсутствует в базе данных");
      error.statusCode = ERROR_CODE_NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Ошибка в формате ID пользователя" });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

// Колбек получения данных текущего пользователя
const getCurrentUser = (req, res) => {
  // Ищем пользователя по сохраннёному полю в мидлвэре
  User.findById(req.user)
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error("Пользователь по заданному ID отсутствует в базе данных");
      error.statusCode = ERROR_CODE_NOT_FOUND;
      throw error;
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Ошибка в формате ID пользователя" });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

// колбек для создания нового пользователя
const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.send({ data: user }))
        .catch((err) => {
          if (err.name === "ValidationError") {
            res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Переданы некорректные данные при создании пользователя" });
          } else if (err.name === "MongoError") {
            res.status(ERROR_CODE_CONFLICT).send({ message: "Данный пользователь уже зарегистрирован" });
          } else {
            res.status(ERROR_CODE_DEFAULT_ERROR).send( { message: "Что-то пошло не так :(" });
          }
        });
    })
    .catch(() => {
      res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Проблема с хешированием пароля" });
    });
};

/*  PATCH /users/me — обновляет профиль
    PATCH /users/me/avatar — обновляет аватар
*/

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  const userID = req.user._id;
  // найдём пользователя по ID
  User.findByIdAndUpdate(userID, { name, about }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error("Пользователь по заданному ID отсутствует в базе данных");
      error.statusCode = ERROR_CODE_NOT_FOUND;
      throw error;
    })
    .then((newUserInfo) => {
      res.status(200).send({ data: newUserInfo });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Ошибка в формате ID пользователя" });
      } else if (err.name === "ValidationError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Переданы некорректные данные при обновлении данных пользователя" });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userID = req.user._id;
  // найдём пользователя по ID
  User.findByIdAndUpdate(userID, { avatar }, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error("Пользователь по заданному ID отсутствует в базе данных");
      error.statusCode = ERROR_CODE_NOT_FOUND;
      throw error;
    })
    .then((newUserData) => {
      res.status(200).send({ data: newUserData });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Ошибка в формате ID пользователя" });
      } else if (err.name === "ValidationError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Переданы некорректные данные при обновлении аватара пользователя" });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

module.exports = {
  getAllUsers, getUser, createUser, updateUserInfo, updateUserAvatar, getCurrentUser,
};

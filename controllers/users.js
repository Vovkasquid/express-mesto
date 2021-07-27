const User = require("../models/user");

// колбек для получения всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => {
      res.status(500).send({ message: "Что-то пошло не так :(" });
    });
};

// колбек для получения определённого пользователя
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error("Пользователь по заданному ID отсутствует в базе данных");
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(404).send({ message: "Ошибка в формате ID" });
      } else {
        res.status(500).send({ message: "Что-то пошло не так :(" });
      }
    });
};

// колбек для создания нового пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при создании пользователя" });
      } else {
        res.status(500).send({ message: "Что-то пошло не так :(" });
      }
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
      error.statusCode = 404;
      throw error;
    })
    .then((newUserInfo) => {
      res.status(200).send({ data: newUserInfo });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(404).send({ message: "Ошибка в формате ID" });
      } else if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные при обновлении данных пользователя" });
      } else {
        res.status(500).send({ message: "Что-то пошло не так :(" });
      }
    });
};

module.exports = {
  getAllUsers, getUser, createUser, updateUserInfo,
};

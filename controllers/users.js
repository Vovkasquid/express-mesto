const User = require("../models/user");
console.log("USER =", User);

// колбек для получения всех пользователей
const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// колбек для получения определённого пользователя
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

// колбек для создания нового пользователя
const createUser = (req, res) => {
  console.log("body", req);
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

module.exports = { getAllUsers, getUser, createUser };

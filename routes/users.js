const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getAllUsers, getUser, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require("../controllers/users");

const auth = require("../middlewares/auth");
/*
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя */

/*  PATCH /users/me — обновляет профиль
    PATCH /users/me/avatar — обновляет аватар
*/

router.get("/users", getAllUsers);

router.get("/users/me", getCurrentUser);

router.get("/users/:userId", getUser);

router.patch("/users/me", updateUserInfo);

router.patch("/users/me/avatar", updateUserAvatar);

module.exports = router;

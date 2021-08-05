const router = require("express").Router();
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

router.get("/users", auth, getAllUsers);

router.get("/users/:userId", auth, getUser);

router.get("/users/me", auth, getCurrentUser);

router.patch("/users/me", auth, updateUserInfo);

router.patch("/users/me/avatar", auth, updateUserAvatar);

module.exports = router;

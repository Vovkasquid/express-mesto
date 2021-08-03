const router = require("express").Router();
const {
  getAllUsers, getUser, getCurrentUser, updateUserInfo, updateUserAvatar,
} = require("../controllers/users");
/*
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя */

/*  PATCH /users/me — обновляет профиль
    PATCH /users/me/avatar — обновляет аватар
*/

router.get("/users", getAllUsers);

router.get("/users/:userId", getUser);

router.get("/users/me", getCurrentUser);

router.patch("/users/me", updateUserInfo);

router.patch("/users/me/avatar", updateUserAvatar);

module.exports = router;

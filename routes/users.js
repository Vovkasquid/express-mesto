const router = require("express").Router();
const {
  getAllUsers, getUser, createUser, updateUserInfo
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

router.post("/users", createUser);

router.patch("/users/me", updateUserInfo);

module.exports = router;

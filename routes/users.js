const router = require('express').Router();
const { getAllUsers, getUser, createUser } = require('../controllers/users');
/*
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя */

router.get('/users', getAllUsers);

router.get('/users/:userId', getUser);

router.post('/users', createUser);

module.exports = router;
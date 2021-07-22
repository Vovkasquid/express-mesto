const router = require('express').Router();

/*
GET /users — возвращает всех пользователей
GET /users/:userId - возвращает пользователя по _id
POST /users — создаёт пользователя */

router.get('/users', (req, res) => {
  console.log('get /users');
  res.status(200).send('success get /users')
});

router.get('/users/:userId', (req, res) => {
  console.log('get /users/:id');
  res.status(200).send('success get /users/:userId');
})

router.post('/users', (req, res) => {
  console.log('POST /users');
  res.status(200).send('success POST /users')
})

module.exports = router;
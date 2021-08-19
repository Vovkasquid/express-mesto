const jwt = require("jsonwebtoken"); // импортируем модуль jsonwebtoken
const Error403 = require("../errors/Error403");

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // Проверяем есть ли заголовок и начинается ли он с Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    next(new Error403("Необходима авторизация"));
  }
  // Отделяем токен от Bearer
  const token = authorization.replace("Bearer ", "");
  let payload;

  // Чтобы отловить ошибки оборачиваем в try-catch
  try {
    // Вытаскиваем айди из токена
    payload = jwt.verify(token, "strongest-key-ever");
  } catch (err) {
    next(new Error403("Необходима авторизация"));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

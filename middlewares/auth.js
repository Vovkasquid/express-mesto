const jwt = require("jsonwebtoken"); // импортируем модуль jsonwebtoken

const ERROR_CODE_FORBIDDEN = 403;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  // Проверяем есть ли заголовок и начинается ли он с Bearer
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(ERROR_CODE_FORBIDDEN)
      .send({ message: "Необходима авторизация" });
  }
  // Отделяем токен от Bearer
  const token = authorization.replace("Bearer ", "");
  let payload;

  // Чтобы отловить ошибки оборачиваем в try-catch
  try {
    // Вытаскиваем айди из токена
    payload = jwt.verify(token, "strongest-key-ever");
  } catch (err) {
    return res
      .status(ERROR_CODE_FORBIDDEN)
      .send({ message: "Необходима авторизация" });
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};

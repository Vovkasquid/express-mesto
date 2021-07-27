/* GET /cards — возвращает все карточки
   POST /cards — создаёт карточку
   DELETE /cards/:cardId — удаляет карточку по идентификатору
   PUT /cards/:cardId/likes — поставить лайк карточке
   DELETE /cards/:cardId/likes — убрать лайк с карточки
*/

const Card = require("../models/card");

const ERROR_CODE_NOT_FOUND = 404;
const ERROR_CODE_BAD_REQUEST = 400;
const ERROR_CODE_DEFAULT_ERROR = 500;

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch(() => {
      res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Переданы некорректные данные при создании пользователя" });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

const deleteCard = (req, res) => {
  // найдём карточку и удалим её
  Card.findById(req.params.cardId)
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error("Карточка с заданным ID отсутствует в базе данных");
      error.statusCode = ERROR_CODE_NOT_FOUND;
      throw error;
    })
    .then((card) => {
      card.remove();
      res.status(200)
        .send({ message: `Карточка с id ${card.id} успешно удалена!` });
    })
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Ошибка в формате ID карточки" });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error("Карточка с заданным ID отсутствует в базе данных");
      error.statusCode = ERROR_CODE_NOT_FOUND;
      throw error;
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Ошибка в формате ID карточки" });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      // Если мы здесь, значит запрос в базе ничего не нашёл
      // Бросаем ошибку и попадаем в catch
      const error = new Error("Карточка с заданным ID отсутствует в базе данных");
      error.statusCode = ERROR_CODE_NOT_FOUND;
      throw error;
    })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_NOT_FOUND) {
        res.status(ERROR_CODE_NOT_FOUND).send({ message: err.message });
      } else if (err.name === "CastError") {
        res.status(ERROR_CODE_BAD_REQUEST).send({ message: "Ошибка в формате ID карточки" });
      } else {
        res.status(ERROR_CODE_DEFAULT_ERROR).send({ message: "Что-то пошло не так :(" });
      }
    });
};

module.exports = {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
};

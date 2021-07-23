/* GET /cards — возвращает все карточки
   POST /cards — создаёт карточку
   DELETE /cards/:cardId — удаляет карточку по идентификатору
*/

const Card = require("../models/card");

console.log("CARD =", Card);

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send({ data: cards });
    })
    .catch((err) => {
      console.log(err);
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteCard = (req, res) => {
  // найдём карточку и удалим её
  Card.findById(req.params.cardId)
    .then((card) => {
      card.remove();
      res.status(200)
        .send({ message: `Карточка с id ${card.id} успешно удалена!` });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.export = { getAllCards, createCard, deleteCard };

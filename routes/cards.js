const router = require("express").Router();
const {
  getAllCards, createCard, deleteCard, likeCard, dislikeCard,
} = require("../controllers/cards");
const auth = require("../middlewares/auth");

/* GET /cards — возвращает все карточки
   POST /cards — создаёт карточку
   DELETE /cards/:cardId — удаляет карточку по идентификатору
   PUT /cards/:cardId/likes — поставить лайк карточке
   DELETE /cards/:cardId/likes — убрать лайк с карточки
*/

router.get("/cards", auth, getAllCards);

router.post("/cards", auth, createCard);

router.delete("/cards/:cardId", auth, deleteCard);

router.put("/cards/:cardId/likes", auth, likeCard);

router.delete("/cards/:cardId/likes", auth, dislikeCard);

module.exports = router;

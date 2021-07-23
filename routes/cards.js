const router = require("express").Router();
const { getAllCards, createCard, deleteCard } = require("../controllers/cards");
/* GET /cards — возвращает все карточки
   POST /cards — создаёт карточку
   DELETE /cards/:cardId — удаляет карточку по идентификатору
*/

router.get("/cards", getAllCards);

router.post("/cards", createCard);

router.delete("/cards/:cardId", deleteCard);

module.exports = router;

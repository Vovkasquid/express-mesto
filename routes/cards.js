const router = require("express").Router();

/* GET /cards — возвращает все карточки
   POST /cards — создаёт карточку
   DELETE /cards/:cardId — удаляет карточку по идентификатору
*/

router.get("/cards", (req, res) => {
  console.log('GET /cards');
  res.status(200).send({ message: 'success get' });
});

router.post("/cards", (req, res) => {
  console.log('POST /cards');
  res.status(200).send({ message: 'success post' });
});

router.delete("/cards/:cardId", (req, res) => {
  console.log("DELETE CARDS");
  res.status(200).send({message: "success delete"});
});

module.exports = router;

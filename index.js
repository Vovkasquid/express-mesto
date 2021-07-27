const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Подключаем роуты
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");

//  задаём порт (ведь мы его вроде как не передаем в окружение)
const { PORT = 3000 } = process.env;
const ERROR_CODE_NOT_FOUND = 404;

// UserID (домашний ноут)
// 60faca1425a4332fafbed7f5
// Рабочий ноут
// 60fede285680401b6c9c9a41

// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// подключаем мидлвары, роуты и всё остальное...
// bodyparser теперь часть экспресса, поэтому подключаем его так
app.use(express.json());

// костыль для авторизации. В ПР14 будет удалён
app.use((req, res, next) => {
  req.user = {
    _id: "60faca1425a4332fafbed7f5",
  };

  next();
});
// Прописываем маршруты
app.use("/", usersRoute);
app.use("/", cardsRoute);
// Обработаем некорректный маршрут и вернём ошибку 404
app.use("*", (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

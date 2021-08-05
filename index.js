const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Подключаем роуты
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const { createUser } = require("./controllers/users");
const checkLogin = require("./controllers/login");

//  задаём порт (ведь мы его вроде как не передаем в окружение)
const { PORT = 3000 } = process.env;
const ERROR_CODE_NOT_FOUND = 404;

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

// Прописываем маршруты
app.use("/", usersRoute);
app.use("/", cardsRoute);
// Маршруты для регистрации и авторизации
app.post("/signin", checkLogin);
app.post("/signup", createUser);
// Обработаем некорректный маршрут и вернём ошибку 404
app.use("*", (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

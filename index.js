const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");

const app = express();

// Подключаем роуты
const usersRoute = require("./routes/users");
const cardsRoute = require("./routes/cards");
const { createUser } = require("./controllers/users");
const checkLogin = require("./controllers/login");
const errorsHandler = require("./middlewares/errorsHandler");
const auth = require("./middlewares/auth");

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

// Маршруты для регистрации и авторизации
app.post("/signin", checkLogin);
app.post("/signup", createUser);
// Защищаем пути авторизацией
app.use(auth);
// Прописываем маршруты
app.use("/", usersRoute);
app.use("/", cardsRoute);
// Обработаем некорректный маршрут и вернём ошибку 404
app.use("*", (req, res) => {
  res.status(ERROR_CODE_NOT_FOUND).send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});
// Добавим обработчик ошибок для celebrate
app.use(errors());
// Добавим обработчик ошибок
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

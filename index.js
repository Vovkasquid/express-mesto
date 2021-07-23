const express = require("express");
const mongoose = require("mongoose");

const app = express();

const usersRoute = require("./routes/users");

//  задаём порт (ведь мы его вроде как не передаем в окружение)
const { PORT = 3000 } = process.env;

// UserID
// 60faca1425a4332fafbed7f5

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

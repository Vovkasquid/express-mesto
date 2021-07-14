const express = require("express");

const app = express();

//  задаём порт (ведь мы его вроде как не передаем в окружение)
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

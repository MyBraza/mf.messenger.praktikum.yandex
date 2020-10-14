const express = require('express');

const app = express();
const PORT = 3000;

// Можно path.join(__dirname, 'static');
// Плюс такого подхода в том, что join сам поставит нужные разделители между дирректориями в зависимости от ОС
app.use(express.static(__dirname + '/static'));

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
});

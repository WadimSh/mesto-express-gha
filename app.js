const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/index');

const { PORT = 3000 } = process.env; 
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

//app.use(bodyParser);
app.use('/users', require('./routes/index'));
//app.use('/cards', require('./routes/cards'))


app.listen(PORT, () => { console.log(`Ссылкана сервер ${PORT}`);});

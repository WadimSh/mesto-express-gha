const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { PORT = 3000 } = process.env; 
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use('/users', require('./routes/users'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => { console.log(`Ссылкана сервер ${PORT}`);});
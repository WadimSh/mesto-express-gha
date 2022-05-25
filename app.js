const express = require('express');

const mongoose = require('mongoose');

const { login, createUser } = require('./controllers/users');
const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use((req, _, next) => {
  req.user = { _id: '627e7e22e42ed434685bcedf' };
  next();
});

app.post('/signin', login);

app.post('/signup', createUser);

app.use('/users', require('./routes/users'));

app.use('/cards', require('./routes/cards'));

app.use((_, res) => {
  res.status(404).send({ message: 'Страница с таким url не найдена' });
});

app.listen(PORT);

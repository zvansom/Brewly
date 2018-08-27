const ejsLayouts = require('express-ejs-layouts');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);

app.use('/auth', require('./controllers/auth'));

app.get('/', (req, res) => {
  res.render('home')
});

app.listen(3000, () => console.log('You\'re listening to the smooth sounds of port 3000 in the morning.') );
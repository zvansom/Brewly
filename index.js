const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const express = require('express');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  })
);
app.use(flash());

app.use('/auth', require('./controllers/auth'));

app.get('/', (req, res) => {
  res.render('home')
});

app.listen(3000, () => console.log('You\'re listening to the smooth sounds of port 3000 in the morning.') );
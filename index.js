const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('stubbed')
});

app.listen(3000, () => console.log('You\'re listening to the smooth sounds of port 3000 in the morning.') );
const express = require('express');
const request = require('request');

const router = express.Router();

const db = require("../models");

const loggedIn = require('../middleware/loggedIn');

const punkApiUrl = 'https://api.punkapi.com/v2/beers/'

router.get('/', loggedIn, (req, res) => {
  res.render('profile/index');
});

router.get('/recipes', loggedIn, (req, res) => {
  db.recipe.findAll()
  .then(recipes => res.render('profile/recipes', { recipes } ))
  .catch(err => res.send(err));
});

router.post('/add', loggedIn, (req, res) => {
  request(punkApiUrl + req.body.id, function(error, response, body) {
    const parsedResponse = JSON.parse(body); 
    db.recipe.findOrCreate({ where: { punkId: parsedResponse[0].id },
      defaults: {
        name: parsedResponse[0].name,
        punkId: parsedResponse[0].id,
        abv: parsedResponse[0].abv,
        ibu: parsedResponse[0].ibu,
        targetFg: parsedResponse[0].targetFg,
        targetOg: parsedResponse[0].targetOg,
        ebc: parsedResponse[0].ebc,
        srm: parsedResponse[0].srm,
        batchSize: parsedResponse[0].volume.value,
        ingredients: JSON.stringify(parsedResponse[0].ingredients)
    } })
    .spread( (recipe, wasCreated) => {
      if(wasCreated) {
        res.send('🤞');
      }
    })
  });
  // res.redirect('/profile/recipes');
});

router.get('/new', loggedIn, (req, res) => {
  res.render('profile/new');
});

router.post('/new', loggedIn, (req, res) => {
  const targetOg = req.body.targetOgLow + ' - ' + req.body.targetOgHigh;
  const targetFg = req.body.targetFgLow + ' - ' + req.body.targetFgHigh;

  // Ingredients object constructor
  const ingredients = {
    malts: [
      {
        maltName: req.body.maltName,
        maltQty: req.body.maltQty,
        maltUnit: req.body.maltUnit,
        maltExtract: req.body.maltExtract
      }
    ],
    hops: [
      {
        hopName: req.body.hopName,
        hopQty: req.body.hopQty,
        hopTime: req.body.hopTime
      }
    ],
    adjuncts: [
      {
        adjunctName: req.body.adjunctName,
        adjunctQty: req.body.adjunctQty
      }
    ],
    yeast: req.body.yeastName
  };

  db.recipe.create({ 
    name: req.body.name,
    style: req.body.style,
    batchSize: req.body.batchSize,
    abv: req.body.abv,
    ibu: req.body.ibu,
    srm: req.body.srm,
    ebc: req.body.ebc,
    targetOg: targetOg,
    targetFg: targetFg,
    mashTemp: req.body.mashTemp,
    fermTemp: req.body.fermTemp,
    ingredients: JSON.stringify(ingredients)
   });

    res.redirect('/profile');
});

router.get('/find', loggedIn, (req, res) => {
  res.render('profile/find', {results: null});
});

router.post('/find', loggedIn, (req, res) => {
  const url = `https://api.punkapi.com/v2/beers?beer_name=${req.body.search}`;
  request(url, function(error, response, body) {
    const parsedResponse = JSON.parse(body); 
    res.render('profile/find', { results: parsedResponse });
  });
});

router.get('/recipes/:id', loggedIn, (req, res) => {
  db.recipe.findOne({ where: { id: req.params.id } })
    .then(recipe => res.render('profile/show', { recipe }))
    .catch(err => res.send(err));
});

module.exports = router;

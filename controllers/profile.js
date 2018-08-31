const express = require('express');
const request = require('request');

const router = express.Router();

const db = require("../models");

const loggedIn = require('../middleware/loggedIn');

const punkApiUrl = 'https://api.punkapi.com/v2/beers/'
const punkApiSearch = "https://api.punkapi.com/v2/beers?beer_name=";

router.get('/', loggedIn, (req, res) => {
  res.render('profile/index');
});

router.get('/recipes', loggedIn, (req, res) => {
  db.recipe.findAll({ where: { userId: req.user.id} })
  .then(recipes => res.render('profile/recipes', { recipes } ))
  .catch(err => res.send(err));
});

router.post('/add', loggedIn, (req, res) => {
  db.recipe.findOrCreate({ 
    where: { 
      punkId: req.body.punkId,
      userId: req.user.id  
    },
    defaults: req.body 
  })
  .spread( (recipe, wasCreated) => {
    console.log('SUCCESS');
    res.send('🤞');
  })
  .catch((err) => {
    console.log('ERR', err);
    res.status(500).send(err);
  })
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
  res.render("profile/find", { ids: [], results: null });
});

router.post('/find', loggedIn, (req, res) => {
  const url = punkApiSearch + req.body.search;
  request(url, function(error, response, body) {
    const parsedResponse = JSON.parse(body); 
    db.recipe.findAll({
      attributes: ['punkId'],
      where: { userId: req.user.id }
    }).then((recipes) => {
      var punkIds = recipes.map((r) => {
        return r.punkId;
      }) || [];
      console.log('punkIds found', punkIds);
      res.render("profile/find", {
        ids: punkIds,
        results: parsedResponse
      });
    }).catch((err) => {
      console.log('ERR', err);
    });
  });
});

router.get('/recipes/:id', loggedIn, (req, res) => {
  db.recipe.findOne({ where: { id: req.params.id } })
  .then(recipe => res.render('profile/show', { recipe }))
  .catch(err => res.send(err));
});

router.delete('/recipes/:id', loggedIn, (req, res) => {
  db.recipe.destroy({ where: { id: req.params.id } })
  res.send(200);
});

module.exports = router;

const express = require('express');

const router = express.Router();

const db = require("../models");

const loggedIn = require('../middleware/loggedIn');

router.get('/', loggedIn, (req, res) => {
  res.render('profile/index')
});

router.get('/recipes', loggedIn, (req, res) => {
  db.recipe.findAll()
  .then(recipes => res.render('profile/recipes', { recipes } ))
  .catch(err => res.send(err));
});

router.get('/new', loggedIn, (req, res) => {
  res.render('profile/new');
});

router.post('/new', loggedIn, (req, res) => {
  const targetOg = req.body.targetOgLow + ' - ' + req.body.targetOgHigh;
  const targetFg = req.body.targetFgLow + ' - ' + req.body.targetFgHigh;
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
  }
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

router.get('/find', (req, res) => {
  res.render('profile/find');
});

module.exports = router;

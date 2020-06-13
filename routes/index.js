var express = require('express');
var router = express.Router();
var authorService = require("../service/authorService")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});



  router.post("/addAuthor",createNewAuthor)
  router.get("/authorsByawardsCount", authorDetailsbyAwardcount)
  router.get("/authorsByawardYear", authorDetailsbyyear)
  router.get("/authorsProfit", authorDetailsbyProfit)
  router.get("/authorsByDob", authorDetailsbyDob)
 
   
  


function createNewAuthor(req, res, next) {
  authorService.addNewauthor(req).then((resp) => {
    res.send(resp)
  }).catch((err) => {
    next(err)
  })
}
function authorDetailsbyAwardcount(req, res, next) {
  authorService.authorDatabyawards(req).then((resp) => {
    res.send(resp)
  }).catch((err) => {
    next(err)
  })
}
function authorDetailsbyyear(req, res, next) {
  authorService.authorDatabyyear(req).then((resp) => {
    res.send(resp)
  }).catch((err) => {
    next(err)

  })
}
function authorDetailsbyProfit(req, res, next) {
  authorService.authorsProfitdetails(req).then((resp) => {
    res.send(resp)
  }).catch((err) => {
    next(err)
  })
}

function authorDetailsbyDob(req, res, next) {
  authorService.authorDatabyDob(req).then((resp) => {
    res.send(resp)
  }).catch((err) => {
    next(err)
  })
}
module.exports = router;


var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json([{id:1, nombre: "Lucas"}, {id:1, nombre: "Nacho"}])
  res.send('respond with a resource');
});

module.exports = router;

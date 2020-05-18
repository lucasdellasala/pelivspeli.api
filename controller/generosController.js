var express = require('express');
var router = express.Router();

const generosService = require('../service/generosService');

module.exports.init = (dbConnection) => {
  
  const genService = generosService.init(dbConnection);

  router.get('/', (req,res) => genService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send(err)));

  return router;
};
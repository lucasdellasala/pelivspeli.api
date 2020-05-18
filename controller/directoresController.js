var express = require('express');
var router = express.Router();

const directoresService = require('../service/directoresService');

module.exports.init = (dbConnection) => {
  
  const dirService = directoresService.init(dbConnection);

  router.get('/', (req,res) => dirService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send(err)));

  return router;
};
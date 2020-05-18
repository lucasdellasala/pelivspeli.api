var express = require('express');
var router = express.Router();

const actoresService = require('../service/actoresService');

module.exports.init = (dbConnection) => {
  
  const actService = actoresService.init(dbConnection);

  router.get('/', (req,res) => actService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send(err)));

  return router;
};
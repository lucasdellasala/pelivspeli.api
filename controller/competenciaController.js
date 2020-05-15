var express = require('express');
var router = express.Router();

const competenciaService = require('../service/competenciaService');
const peliculaService = require('../service/peliculaService');

module.exports.init = (dbConnection) => {
  
  const compService = competenciaService.init(dbConnection);
  const peliService = peliculaService.init(dbConnection);

  router.get('/', (req,res) => compService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send(err)));

  router.get('/:id/peliculas', (req, res, next) => {
    const compPromise = compService.getCompetenciaById(req.params.id);
    const peliPromise = peliService.getAllPelis();

    Promise.all([compPromise, peliPromise])
      .then((results) => {
        console.log(results);
        res.status(200).json({competencia: results[0].nombre, peliculas: results[1]})
      })
      .catch(err => res.status(404).send(err));
  });

  router.post('/:id/voto', (req,res) => compService.votarPelicula(req.params.id, req.body.idPelicula)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).send(err)));

  router.get('/:id/resultados', (req,res) => compService.getResultados(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).send(err)));

  return router;
};
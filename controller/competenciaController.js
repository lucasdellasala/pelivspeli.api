var express = require('express');
var competencia = require('../model/competencia');
var router = express.Router();

const competenciaService = require('../service/competenciaService');
const peliculaService = require('../service/peliculaService');

module.exports.init = (dbConnection) => {
  
  const compService = competenciaService.init(dbConnection);
  const peliService = peliculaService.init(dbConnection);

  router.get('/', (req,res) => compService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(400).send(err)));

  router.post('/', (req,res) => {

    const comp = new competencia(0, req.body.nombre, req.body.genero, req.body.actor, req.body.director);

    compService.createCompetencia(comp)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(422).send('Error'))

  });

  router.get('/:id', (req, res, next) => compPromise = compService.getCompetenciaById(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(422).send('Error')));

  router.get('/:id/peliculas', (req, res, next) => {
    compService.getCompetenciaById(req.params.id)
    .then((competencia) => {
      console.log(competencia);
      peliService.getAllPelis(competencia).then((peliculas) => {
        res.status(200).json({competencia: competencia.nombre, peliculas: peliculas})
      })
    }).catch(err => res.status(404).send(err));
  });

  router.post('/:id/voto', (req,res) => compService.votarPelicula(req.params.id, req.body.idPelicula)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).send(err)));

  router.delete('/:id/votos', (req,res) => compService.reiniciarVotos(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).send(err)));  

  router.get('/:id/resultados', (req,res) => compService.getResultados(req.params.id)
  .then(data => res.status(200).json(data))
  .catch(err => res.status(400).send(err)));

  return router;
};
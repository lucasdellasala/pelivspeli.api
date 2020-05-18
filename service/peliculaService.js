const peliculaRepository = require('../repository/peliculaRepository')

const service = {};

module.exports.init = (dbConnection) => {
    const repository = peliculaRepository.init(dbConnection);

    service.getAllPelis = (competencia) => repository.getAll(competencia)
        .then((peliculas) => { return peliculas })
        .catch((err) => {return err});

    return service;
}
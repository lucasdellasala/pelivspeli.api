const competenciaRepository = require('../repository/competenciaRepository')

const service = {};

module.exports.init = (dbConnection) => {
    const repository = competenciaRepository.init(dbConnection);

    service.getAll = () => repository.getAll()
        .then((data) => { return data })
        .catch((err) => {return err});

    service.getCompetenciaById = (id) => repository.getById(id)
        .then((data) => { return data })
        .catch((err) => {console.log(err); return err});

    service.votarPelicula = (idCompetencia, idPelicula) => repository.votarPelicula(idCompetencia, idPelicula)
        .then((data) => { return data })
        .catch((err) => {console.log(err); return err});

    service.getResultados = (idCompetencia) => repository.getResultados(idCompetencia)
        .then((data) => { return data })
        .catch((err) => {console.log(err); return err});
        

    return service;
}
const competenciaRepository = require('../repository/competenciaRepository')

const service = {};

module.exports.init = (dbConnection) => {
    const repository = competenciaRepository.init(dbConnection);

    service.getAll = () => repository.getAll()
        .then((data) => { return data })
        .catch((err) => {throw err});

    service.getCompetenciaById = (id) => repository.getById(id)
        .then((data) => { return data })
        .catch((err) => {console.log(err); throw err});

    service.votarPelicula = (idCompetencia, idPelicula) => repository.votarPelicula(idCompetencia, idPelicula)
        .then((data) => { return data })
        .catch((err) => {console.log(err); throw err});

    service.getResultados = (idCompetencia) => repository.getResultados(idCompetencia)
        .then((data) => { return data })
        .catch((err) => {console.log(err); throw err});

    service.createCompetencia = (competencia) => repository.createCompetencia(competencia)
        .then((data) => { return data })
        .catch((err) => {console.log(err); throw err});

    service.reiniciarVotos = (idCompetencia) => repository.reiniciarVotos(idCompetencia)
        .then((data) => { return data })
        .catch((err) => {console.log(err); throw err});        
        

    return service;
}
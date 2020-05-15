const peliculaRepository = require('../repository/peliculaRepository')

const service = {};

module.exports.init = (dbConnection) => {
    const repository = peliculaRepository.init(dbConnection);

    service.getAllPelis = () => repository.getAll()
        .then((data) => { return data })
        .catch((err) => {return err});

    return service;
}
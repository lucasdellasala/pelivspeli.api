const generosRepository = require('../repository/generosRepository')

const service = {};

module.exports.init = (dbConnection) => {
    const repository = generosRepository.init(dbConnection);

    service.getAll = () => repository.getAll()
        .then((data) => { return data })
        .catch((err) => {throw err});

    return service;
}
const actoresRepository = require('../repository/actoresRepository')

const service = {};

module.exports.init = (dbConnection) => {
    const repository = actoresRepository.init(dbConnection);

    service.getAll = () => repository.getAll()
        .then((data) => { return data })
        .catch((err) => {throw err});

    return service;
}
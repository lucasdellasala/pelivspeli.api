const directoresRepository = require('../repository/directoresRepository')

const service = {};

module.exports.init = (dbConnection) => {
    const repository = directoresRepository.init(dbConnection);

    service.getAll = () => repository.getAll()
        .then((data) => { return data })
        .catch((err) => {throw err});

    return service;
}
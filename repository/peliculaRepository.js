const pelicula = require('../model/pelicula');
const repository = {};

module.exports.init = (dbConnection) => {
    const conn = dbConnection;

    repository.getAll = () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT id, poster, titulo FROM pelicula ORDER BY RAND() LIMIT 2', (err,results) => {
                if(err) return reject(error);
                resolve(results);
            });
        });
    };

    return repository;
}
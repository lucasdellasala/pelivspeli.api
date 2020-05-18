const repository = {};

module.exports.init = (dbConnection) => {
    const conn = dbConnection;

    repository.getAll = () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT id, nombre FROM director', (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
        });
    };

    return repository;
}
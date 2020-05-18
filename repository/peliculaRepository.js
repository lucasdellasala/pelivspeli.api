const pelicula = require('../model/pelicula');
const repository = {};

module.exports.init = (dbConnection) => {
    const conn = dbConnection;

    repository.getAll = (competencia) => {
        
        let where = competencia.director ? 'WHERE dp.director_id = ' + competencia.director : '';

        if (where) {
            if (competencia.actor)
                where = ' AND ap.id = ' + competencia.actor;
        } else if (competencia.actor) {
            where = 'WHERE ap.id = ' + competencia.actor;
        }

        if (where) {
            if (competencia.genero) 
                where = ' AND genero_id = ' + competencia.genero;
        } else if (competencia.genero) {
            where = 'WHERE genero_id = ' + competencia.genero;
        }

        const query = 'SELECT DISTINCT ' +
        'peli.id,' +
        'peli.titulo,' +
        'peli.poster ' +
        'FROM pelicula peli ' +
        'LEFT JOIN actor_pelicula ap ON ap.pelicula_id = peli.id ' +
        'LEFT JOIN director_pelicula dp ON dp.pelicula_id = peli.id ' +
        where +
        ' ORDER BY RAND() LIMIT 2';

        console.log(query);

        return new Promise((resolve, reject) => {
            conn.query(query,
                        (err,results) => {
                if(err) return reject(error);
                resolve(results);
            });
        });
    };

    return repository;
}
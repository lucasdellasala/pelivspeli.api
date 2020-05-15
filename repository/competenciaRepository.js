const competencia = require('../model/competencia');
const resultado = require('../model/resultado');
const repository = {};

module.exports.init = (dbConnection) => {
    const conn = dbConnection;

    repository.getAll = () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT id, nombre FROM competencias', (err,results) => {
                if(err) return reject(error);
                resolve(results);
            });
        });
    };

    repository.getById = (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT id, nombre FROM competencias WHERE id = ?',[id], (err,results) => {
                if(err) return reject(err);
                console.log(results);
                if(results.length > 0) return resolve(new competencia(results[0].id, results[0].nombre));
                reject('No existe la competencia');
            });
        });
    };

    repository.votarPelicula = (idCompetencia, idPelicula) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO votos SET ?',{peliculasId: idPelicula, competenciasId: idCompetencia }, (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
        });
    };

    repository.getResultados = (idCompetencia) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT ' + 
                       'compe.nombre as competencia,' +
                       'count(peliculasId) as votos,' +
                       'peli.titulo,' +
                       'peli.poster,' +
                       'peli.id as pelicula_id ' +
                       'FROM votos vot ' +
                       'LEFT JOIN pelicula peli ON peli.id = vot.peliculasId ' +
                       'LEFT JOIN competencias compe ON compe.id = vot.competenciasid ' +
                       'WHERE competenciasId = ? ' +
                       'GROUP BY peliculasId ' + 
                       'ORDER BY votos desc ' +
                       'LIMIT 3'
                       ,[idCompetencia], (err,results) => {
                if(err) return reject(err);
                
                let resultados = [];

                if (results.length > 0)
                    results.forEach(element => resultados.push(new resultado(element.pelicula_id, element.poster, element.titulo, element.votos)));
                console.log({competencia:results[0].competencia, resultados});
                resolve({competencia:results[0].competencia, resultados});
            });
        });
    };

    return repository;
}
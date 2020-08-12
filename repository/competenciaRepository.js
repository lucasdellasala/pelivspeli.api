const competencia = require('../model/competencia');
const resultado = require('../model/resultado');
const repository = {};

module.exports.init = (dbConnection) => {
    const conn = dbConnection;

    repository.getAll = () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT id, nombre FROM competencias', (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
        });
    };

    repository.getById = (id) => {
        return new Promise((resolve, reject) => {
            //
            conn.query('SELECT id, nombre, directorId, actorId, generoId FROM competencias WHERE id = ?',[id], (err,results) => {
                if(err) return reject(err);
                if(results.length > 0) return resolve(new competencia(results[0].id, 
                                                                        results[0].nombre,
                                                                        results[0].generoId,
                                                                        results[0].actorId,
                                                                        results[0].directorId));
                reject(err);
            });
        });
    };

    repository.createCompetencia = (competencia) => {
        console.log(competencia);
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO competencias SET ?',{nombre: competencia.nombre,
                                                         generoId: competencia.genero == 0 ? null: competencia.genero,
                                                         directorId: competencia.director == 0 ? null : competencia.director,
                                                         actorId: competencia.actor == 0 ? null : competencia.actor}, (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
        });
    };

    repository.reiniciarVotos = (idCompetencia) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM votos WHERE competencia_Id =  ?',[idCompetencia], (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
        });
    };

    repository.votarPelicula = (idCompetencia, idPelicula) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO votos SET ?',{pelicula_Id: idPelicula, competencia_Id: idCompetencia }, (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
        });
    };

    repository.getResultados = (idCompetencia) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT ' + 
                       'compe.nombre as competencia,' +
                       'count(pelicula_Id) as votos,' +
                       'peli.titulo,' +
                       'peli.poster,' +
                       'peli.id as pelicula_id ' +
                       'FROM votos vot ' +
                       'LEFT JOIN pelicula peli ON peli.id = vot.pelicula_Id ' +
                       'LEFT JOIN competencias compe ON compe.id = vot.competencia_Id ' +
                       'WHERE competencia_Id = ? ' +
                       'GROUP BY pelicula_Id ' + 
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

    repository.borrarCompetencia = (idCompetencia) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM competencias WHERE id =  ?',[idCompetencia], (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
            conn.query('DELETE FROM votos WHERE competencia_id = ?',[idCompetencia], (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
        });
    };

    repository.editarNombre = (nombre, idCompetencia) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE competencias SET nombre = ? WHERE id = ?',[nombre, idCompetencia], (err,results) => {
                if(err) return reject(err);
                resolve(results);
            });
        });
    };



    return repository;
}
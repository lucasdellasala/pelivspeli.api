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

        const genero_id = competencia.genero == 0 ? null: competencia.genero;
        const director_id = competencia.director == 0 ? null : competencia.director;
        const actor_id = competencia.actor == 0 ? null : competencia.actor;

                                            
                                              
        //Armando query de verificacion                                      

        let queryDeVerificacion = "SELECT * FROM pelicula p ";
        let flag = false;
        if (actor_id != null){
            queryDeVerificacion = queryDeVerificacion + "JOIN actor_pelicula ap on p.id = ap.pelicula_id "
        };
        if (director_id != null){
            queryDeVerificacion = queryDeVerificacion + "JOIN director_pelicula dp on p.id = dp.pelicula_id "
        };
        if (actor_id != null){
            queryDeVerificacion = queryDeVerificacion + "WHERE ap.actor_id = ? ";
            flag = true;
        } 
        if (director_id != null){
            if (flag == false){
                queryDeVerificacion = queryDeVerificacion + "WHERE dp.director_id = ? ";
            } else {
                queryDeVerificacion = queryDeVerificacion + "AND dp.director_id = ?";
                flag = true;
            }
        };
        if (genero_id != null){
            if(flag == false){
                queryDeVerificacion = queryDeVerificacion + "WHERE p.genero_id = ?";
            } else {
                queryDeVerificacion = queryDeVerificacion + "AND p.genero_id = ?";
                flag = true;
            }
        }


        //Armando valores de la query

        let values = [];

        if (actor_id != null){
            values.push(actor_id);
        };
        if (director_id != null){
            values.push(director_id);
        }; 
        if (genero_id != null){
            values.push(genero_id);
        };



        return new Promise((resolve, reject) => {
             conn.query(queryDeVerificacion, values, (err,results) => {
                //Verificacion
                if (results.length < 2){
                    return reject(err);
                }
                resolve(
                    conn.query('INSERT INTO competencias SET ?',{nombre: competencia.nombre,
                        generoId: genero_id,
                        directorId: director_id,
                        actorId: actor_id}, (err,results) => {
                        if(err) return reject(err);
                        resolve(results);
                        })
                );
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
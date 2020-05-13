var express = require('express');
var router = express.Router();
const mysql = require("mysql");
var opciones = require("../model/opciones");

const conn = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "password",
  database: "competencias"
});

/* GET users listing. */
router.get('/', function(req, res, next) {

  conn.query("SELECT * FROM competencias", (err, rows)=> {
    if(err) throw err;
    res.json(rows)
  });

  conn.query((err)=> {
  });

});

router.get('/:id/peliculas', function(req, res, next) {

  let nombreCompetencia;
  let peliculas;

  conn.query("SELECT nombre FROM competencias WHERE id = ?", [req.param.id] , (err, results)=> {
    if(err) throw err;
    nombreCompetencia = results[0].nombre;
  });

  var peliculaPromise = conn.query("SELECT id, titulo, poster FROM pelicula", (err, results)=> {
    if(err) throw err;

    console.log(results[0].poster);
    peliculas = results;

    console.log(peliculas);
  res.json(new opciones(nombreCompetencia, peliculas))
  });

  conn.query((err)=> {
  });


});

module.exports = router;

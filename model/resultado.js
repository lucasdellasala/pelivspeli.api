const Resultado = class {
    constructor (pelicula_id, poster, titulo, votos){
        this.pelicula_id = pelicula_id;
        this.poster = poster;
        this.titulo = titulo;
        this.votos = votos;
    }
}

module.exports = Resultado;
const Competencia = class {
    constructor (id, nombre, genero, actor, director){
        this.id = id;
        this.nombre = nombre;
        this.genero = genero;
        this.actor = actor;
        this.director = director;
    }
}

module.exports = Competencia;
import {Mongo} from "meteor/mongo";
import {Puestos} from "../catalogos/puestos/collection";
import {Estados} from "../catalogos/estados/collection";
import {Habilidades} from "../catalogos/habilidades/collection";
import {Experiencias} from "../catalogos/experiencias/collection";

export const Vacantes = new Mongo.Collection('vacantes', {});

Vacantes.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

Vacantes.helpers({
    puesto(){
        return Puestos.findOne({_id: this.puestoId});
    },
    estado(){
        return Estados.findOne({_id: this.estadoId});
    },
    experienciasVcnt(){
        let strExperiencias = '';
        let experiencias = Experiencias.find({_id: {$in: this.perfil.experiencia.listado}});
        experiencias.forEach((experiencia)=>{
            strExperiencias = experiencia.descripcion + ' | ';
        });
        return strExperiencias;
    },
    hibilidadesVcnt(){
        let strHabilidades = '';
        let habilidades = Habilidades.find({_id: {$in: this.perfil.habilidades.listado}});
        habilidades.forEach((habilidad)=>{
            strHabilidades += habilidad.descripcion + ' | ';
        });
        return strHabilidades;
    }
});

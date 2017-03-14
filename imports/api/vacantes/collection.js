import {Mongo} from "meteor/mongo";
import {Puestos} from "../catalogos/puestos/collection";
import {Estados} from "../catalogos/estados/collection";
import {Habilidades} from "../catalogos/habilidades/collection";
import {Experiencias} from "../catalogos/experiencias/collection";
import {Escuelas} from "../catalogos/escuelas/collection";

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
        if (this.perfil && this.perfil.experiencia.requerida) {
            let experiencias = Experiencias.find({_id: {$in: this.perfil.experiencia.listado}});
            experiencias.forEach((experiencia)=> {
                strExperiencias += experiencia.descripcion + ' | ';
            });
        } else {
            strExperiencias = 'No requerida';
        }

        return strExperiencias;
    },
    hibilidadesVcnt(){
        let strHabilidades = '';
        if (this.perfil && this.perfil.habilidades.requerida) {
            let habilidades = Habilidades.find({_id: {$in: this.perfil.habilidades.listado}});
            habilidades.forEach((habilidad)=> {
                strHabilidades += habilidad.descripcion + ' | ';
            });
        } else {
            strHabilidades = 'No requerida';
        }

        return strHabilidades;
    },
    escolaridadVcnt(){
        if (this.perfil) {
            return Escuelas.findOne({_id: this.perfil.escolaridad});
        }
    }
});

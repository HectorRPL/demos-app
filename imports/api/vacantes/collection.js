import {Mongo} from 'meteor/mongo';
import {Puestos} from '../puestos/collection';
import {Estados} from '../estados/collection';
import {Cadenas} from '../cadenas/collection';


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
    }
});

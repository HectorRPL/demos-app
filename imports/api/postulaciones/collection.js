/**
 * Created by jvltmtz on 16/08/16.
 */
import {Mongo} from 'meteor/mongo';
import postulacionesCounts from './postulacionesCounts';
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Vacantes} from '../vacantes/collection';
import {Tiendas} from '../tiendas/collection';

class PostulacionesCollection extends Mongo.Collection {
    insert(doc, callback) {
        const result = super.insert(doc, callback);
        postulacionesCounts.afterInsertPostulacion(doc);
        return result;
    }
}

export const Postulaciones = new PostulacionesCollection('postulaciones');

Postulaciones.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

const Schema = {};
Schema.postulaciones = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
    },
    vacanteId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    tiendaId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    candidatoId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id,
        denyUpdate: true,
    },
    estado: {
        type: Number,
    },
    postVistoCandidato: {
        type: Boolean,
        defaultValue: false,
    },
    postVistoAgencia: {
        type: Boolean,
        defaultValue: false,
    },
    selecVistoCandidato: {
        type: Boolean,
        defaultValue: false,
    },
    selecVistoAgencia: {
        type: Boolean,
        defaultValue: false,
    },
    fechaPostulacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true,
    },
    fechaSeleccion: {
        type: Date,
        optional: true,
        denyUpdate: true,
    }
});

Postulaciones.attachSchema(Schema.postulaciones);

Postulaciones.helpers({
    vacante(){
        return Vacantes.findOne({_id: this.vacanteId});
    },
    tienda() {
        return Tiendas.findOne({_id: this.tiendaId});
    }
});




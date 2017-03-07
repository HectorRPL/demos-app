import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
export const Candidatos = new Mongo.Collection('candidatos');

Candidatos.deny({
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

Schema.candidato = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    propietario: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(),
        denyUpdate: true
    },
    nombre: {
        type: String,
        max: 30,
        min: 2,
        regEx: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/
    },
    apellidos: {
        type: String,
        max: 30,
        min: 2,
        regEx: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/
    },
    nacimientoDia: {
        type: Number,
        max: 31,
        min: 1,
        regEx: /^[0-9]$/,
        optional: true
    },
    nacimientoMes: {
        type: Number,
        max: 12,
        min: 1,
        regEx: /^[0-9]$/,
        optional: true
    },
    nacimientoAnio: {
        type: Number,
        regEx: /^[0-9]$/,
        optional: true
    },
    sexo: {
        type: String,
        max: 6,
        min: 5,
        regEx: /^[a-zA-Z]/
    }
});

Candidatos.attachSchema(Schema.candidato);

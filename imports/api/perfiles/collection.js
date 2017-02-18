import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Perfiles = new Mongo.Collection('perfiles');

Perfiles.deny({
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

Schema.perfil = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    candidatoId: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    fechaCreacion: {
        type: Date,
        defaultValue: new Date(), denyUpdate: true
    },
    estatura: {
        type: Number,
        max: 2.3,
        min: 1.3,
        decimal: true
    },
    escolaridadId: {
        type: String,
        max: 5,
        min: 0
    },
    talla: {
        type: String,
        max: 15,
        min: 0
    },
    puestoId: {
        type: String,
        max: 3,
        min: 1
    },
    experiencias: {
        type: Object,
        blackbox: true
    },
    habilidades: {
        type: Object,
        blackbox: true
    },
});

Perfiles.attachSchema(Schema.perfil);

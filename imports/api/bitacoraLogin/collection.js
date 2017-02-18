/**
 * Created by jvltmtz on 5/01/17.
 */
import {Mongo} from "meteor/mongo";
export const BitacoraLogin = new Mongo.Collection('bitacoraLogin');

BitacoraLogin.deny({
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

Schema.bitacoraLogin = new SimpleSchema({
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
    fechaLogin: {
        type: Date
    },
    fechaLogout: {
        type: Date,
        optional: true
    },
    conexion: {
        type: Object,
        blackbox: true
    },
    estadoRegistro: {
        type: String
    },
    tipoLogin: {
        type: String
    }
});

BitacoraLogin.attachSchema(Schema.bitacoraLogin);
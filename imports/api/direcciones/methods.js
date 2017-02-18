/**
 * Created by jvltmtz on 15/09/16.
 */
import {Meteor} from "meteor/meteor";
import {Random} from "meteor/random";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {Direcciones} from "./collection.js";
import {Candidatos} from "../candidatos/collection.js";

const ID = ['_id'];

const CAMPOS_DIRECCION = ['calle', 'delMpio', 'estado', 'estadoId', 'colonia', 'codigoPostal', 'numExt', 'numInt'];

// CREAR CANDIDATO
export const crear = new ValidatedMethod({
    name: 'direccion.crear',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para crear una dirección necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: Direcciones.simpleSchema().pick(CAMPOS_DIRECCION).validator({
        clean: true,
        filter: false
    }),
    run({calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt}) {
        if (Meteor.isServer) {
            const candidato = Candidatos.findOne({propietario: this.userId});
            const direccion = {
                propietario: candidato._id,
                calle,
                delMpio,
                estado,
                estadoId,
                colonia,
                codigoPostal,
                numExt,
                numInt,
                codigoPais: 'MX'
            };
            return Direcciones.insert(direccion);
        }
    }
});

// ACTUALIZAR DIRECCIÓN
export const actualizar = new ValidatedMethod({
    name: 'direccion.actualizar',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Direcciones.simpleSchema().pick(ID, CAMPOS_DIRECCION).validator({
        clean: true,
        filter: false
    }),
    run({_id, calle, delMpio, estado, estadoId, colonia, codigoPostal, numExt, numInt}) {

        return Direcciones.update({
            _id: _id
        }, {
            $set: {
                calle: calle,
                delMpio: delMpio,
                estado: estado,
                estadoId: estadoId,
                colonia: colonia,
                codigoPostal: codigoPostal,
                numExt: numExt,
                numInt: numInt
            }
        });
    }
});

const DIRECCIONES_METHODS = _.pluck([ValidatedMethod, actualizar], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(DIRECCIONES_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}
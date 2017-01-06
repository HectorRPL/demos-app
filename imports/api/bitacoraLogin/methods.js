/**
 * Created by jvltmtz on 5/01/17.
 */
import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {BitacoraLogin} from "./collection";


export const obtenerEstadoReg = new ValidatedMethod({
    name: 'bitacoraLogin.obtenerEstadoReg',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para obtener continuar con el registro necesitas.',
        reason: 'Usuario no logeado'
    },
    validate: null,
    run() {
        if (Meteor.isServer) {
            const bitLogin = BitacoraLogin.findOne({propietario: this.userId});
            return bitLogin.estadoRegistro;
        }
    }
});

export const actualizarEstadoReg = new ValidatedMethod({
    name: 'bitacoraLogin.actualizarEstadoReg',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para actualizar estado necesitas registrarte.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        estado: {type: String}
    }).validator(),
    run({estado}) {
        if (Meteor.isServer) {
            return BitacoraLogin.update({propietario: this.userId},
                {$set: {estadoRegistro: estado}});
        }
    }
});
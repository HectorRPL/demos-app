/**
 * Created by jvltmtz on 10/01/17.
 */
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {actualizarFechaNacimiento} from "../candidatos/methods";
import {insertar} from "../codigosVerificacion/methods";
import {Meteor} from "meteor/meteor";
import {_} from "meteor/underscore";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";

export const actualizarEmail = new ValidatedMethod({
    name: 'usuarios.actualizarEmail',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        email: {type: String, regEx: SimpleSchema.RegEx.Email}
    }).validator(),
    run({email}) {
        if (Meteor.isServer) {
            return Meteor.users.update({_id: this.userId}, {
                $set: {
                    'emails.$.address': email,
                    'emails.$.verified': false
                }
            });
        }
    }
});

export const actualizarCelular = new ValidatedMethod({
    name: 'usuarios.actualizarCelular',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para cambiar el celular necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: new SimpleSchema({
        celular: {type: String},
        paisLada: {type: String}
    }).validator(),
    run({celular, paisLada}) {
        if (Meteor.isServer) {
            Meteor.users.update({_id: this.userId}, {
                $set: {
                    'phone.number': celular,
                    'phone.paisLada': paisLada,
                    'phone.verified': false
                }
            }, (err)=> {
                if (err) {
                    throw  new Meteor.Error(403, 'No se pudo actualizar el celular', 'error actualizar celular');
                } else {
                    return insertar.call({});
                }
            });

        }

    }
});

export const actualizarRegFacebook = new ValidatedMethod({
    name: 'usuarios.actualizarRegFacebook',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para actulizar tu registro necesitas registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        celular: {type: String},
        paisLada: {type: String},
        nacimientoDia: {type: String},
        nacimientoMes: {type: String},
        nacimientoAnio: {type: String}
    }).validator(),
    run({celular, paisLada, nacimientoDia, nacimientoMes, nacimientoAnio}) {
        if (Meteor.isServer) {
            actualizarCelular.call({celular: celular, paisLada: paisLada},  (err)=> {
                if(!err){
                    const fechaNacimiento = {
                        nacimientoDia: nacimientoDia,
                        nacimientoMes: nacimientoMes,
                        nacimientoAnio: nacimientoAnio
                    };
                    actualizarFechaNacimiento.call(fechaNacimiento);
                }
            });
        }

    }
});

export const existeCelular = new ValidatedMethod({
    name: 'usuarios.existeCelular',
    mixins: [CallPromiseMixin],
    validate: new SimpleSchema({
        celular: {type: String},
        codigoLada: {type: String}
    }).validator(),
    run({celular, codigoLada}) {
        if (Meteor.isServer) {
            return Meteor.users.find({'phone.number': celular}).count();
        }

    }
});

const USUARIOS_METHODS = _.pluck([actualizarCelular, actualizarRegFacebook, existeCelular, actualizarEmail], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(USUARIOS_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}



/**
 * Created by jvltmtz on 6/03/17.
 */
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {CodigosVerificaion} from "./collection";
import {Meteor} from "meteor/meteor";
import {_} from "meteor/underscore";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";

export const insertar = new ValidatedMethod({
    name: 'codigosVerificacion.insertar',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para insertar un codigo verificacion necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: null,
    run({}) {
        CodigosVerificaion.insert({_id: this.userId}, (err, resultId)=> {
            if (resultId) {
                const resCod = CodigosVerificaion.findOne({_id: resultId});
                try {
                    TwilioSMS.enviarSMS(this.userId, resCod.codigo);
                } catch (e) {
                    console.log('Error al enviar el SMS ', e);
                }
            }
        });
    }
});

export const actualizar = new ValidatedMethod({
    name: 'codigosVerificacion.actualizar',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para actualizar un codigo verificacion necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: null,
    run({}) {
        CodigosVerificaion.update({_id: this.userId});
    }
});

const USUARIOS_METHODS = _.pluck([insertar], 'name');
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
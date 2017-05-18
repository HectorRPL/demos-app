/**
 * Created by jvltmtz on 19/01/17.
 */
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {RestrictMixin} from "meteor/ziarno:restrict-mixin";
import {ProvideMixin} from "meteor/ziarno:provide-mixin";
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {Twilio} from "meteor/mrt:twilio-meteor";
import {CodigosVerificaion} from "../codigosVerificacion/collection";

export const volverEnviarSMS = new ValidatedMethod({
    name: 'twilio.volverEnviarSMS',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para enviar un SMS necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: null,
    run({}) {
        if (Meteor.isServer) {
            const codigoVer = CodigosVerificaion.findOne({_id: this.userId});
            let fechaHoy = new Date();
            if (fechaHoy < codigoVer.expiracion) {
                const min = Math.ceil(Math.abs((fechaHoy.getTime() - codigoVer.expiracion.getTime()) / 60000));
                throw new Meteor.Error(403, `Espere ${min} min. para solicitar nuevo código de confirmación`, 'tiempo de envio espera');
            }
            try {
                CodigosVerificaion.update({_id: this.userId}, {$set: {numIntentos: 0}});
            } catch (e) {
                throw  e;
            }
        }
    }
});

export const verificarCelular = new ValidatedMethod({
    name: 'twilio.verificarCelular',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: '403',
        message: 'Para verificar un celular necesitas iniciar sesión',
        reason: 'El usuario no loggeado',
    },
    validate: new SimpleSchema({
        codigo: {type: String}
    }).validator(),
    run({codigo}) {
        if (Meteor.isServer) {
            const selector = {$and: [{_id: this.userId}, {codigo: codigo}]};
            const codigoVerif = CodigosVerificaion.findOne(selector);
            if (codigoVerif) {
                if (new Date() > codigoVerif.expiracion) {
                    throw new Meteor.Error(403, 'Codigo de verificacion expirado, solicita un nuevo codigo', 'codigo expirado');
                } else {
                    return CodigosVerificaion.remove({_id: this.userId});
                }
            } else {
                throw new Meteor.Error(403, 'Código no valido', 'codigo no valido');
            }
        }
    }
});


const TWILIO_METHODS = _.pluck([volverEnviarSMS, verificarCelular], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(TWILIO_METHODS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}



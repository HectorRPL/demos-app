/**
 * Created by jvltmtz on 19/01/17.
 */
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {LoggedInMixin} from 'meteor/tunifight:loggedin-mixin';
import {RestrictMixin} from 'meteor/ziarno:restrict-mixin';
import {ProvideMixin} from 'meteor/ziarno:provide-mixin';
import {Meteor} from 'meteor/meteor';
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {Twilio} from 'meteor/mrt:twilio-meteor';
import {CodigosVerificaion} from '../codigosVerificacion/collection';

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
            TwilioSMS.verificarTiempoEnvio(this.userId);
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
            try {
                VerificarSMS.verificarCodigo(codigo, this.userId);
            } catch (e) {
                throw  e;
            }
            return CodigosVerificaion.remove({_id: this.userId});
        }

    }
});

export const cambiarCelular = new ValidatedMethod({
    name: 'twilio.cambiarCelular',
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
                    'phone.paisLada': paisLada
                }
            }, (err)=> {
                if (err) {
                    throw  new Meteor.Error(403, 'No se pudo actualizar el celular', 'error actualizar celular');
                } else {
                    try {
                        CodigosVerificaion.update({_id: this.userId}, {$set: {numIntentos: 0}});
                    } catch (e) {
                        throw  e;
                    }
                }
            });


        }

    }
});

const TWILIO_METHODS = _.pluck([volverEnviarSMS, verificarCelular, cambiarCelular], 'name');
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



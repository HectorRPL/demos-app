/**
 * Created by jvltmtz on 10/01/17.
 */
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {CallPromiseMixin} from "meteor/didericis:callpromise-mixin";
import {actualizarFechaNacimiento} from '../candidatos/methods'
import {Meteor} from 'meteor/meteor';
import {_} from "meteor/underscore";

export const actualizarPhone = new ValidatedMethod({
    name: 'usuarios.actualizarPhone',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        celular: {type: String},
        codigoPais: {type: String}
    }).validator(),
    run({celular, codigoPais}) {
        if (Meteor.isServer) {
            return Meteor.users.update({_id: this.userId}, {
                $set: {
                    'phone.number': celular,
                    'phone.paisCodigo': codigoPais
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
            Meteor.users.update({_id: this.userId}, {
                $set: {
                    'phone.number': celular,
                    'phone.paisCodigo': paisLada,
                    'phone.verified': false
                }
            }, (err)=> {
                if (err) {
                    throw new Meteor.Error(403, 'No se puedo actulizar el celular, porfavor intente mas tarde.', 'error celular');
                } else {
                    const fechaNacimiento = {
                        nacimientoDia: nacimientoDia,
                        nacimientoMes: nacimientoMes,
                        nacimientoAnio: nacimientoAnio
                    };
                    actualizarFechaNacimiento.call(fechaNacimiento, (err)=>{

                    });
                    TwilioSMS.crearCodigoVerificacion(this.userId);

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



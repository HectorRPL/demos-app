/**
 * Created by jvltmtz on 16/08/16.
 */
import {Meteor} from "meteor/meteor";
import {DDPRateLimiter} from "meteor/ddp-rate-limiter";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {Postulaciones} from "./collection.js";
import {Candidatos} from "../candidatos/collection";

const ID = ['_id'];

export const registrar = new ValidatedMethod({
    name: 'postulaciones.registrar',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para postularse en una vacante necesitas registrarte y/o iniciar sesión.',
        reason: 'Usuario no logeado'
    },
    validate: new SimpleSchema({
        tiendaId: {type: String},
        vacanteId: {type: String}
    }).validator(),
    run({tiendaId, vacanteId}) {

        if (Meteor.isServer) {
            const candidato = Candidatos.findOne({propietario: this.userId});
            const postulacion = {
                vacanteId: vacanteId,
                tiendaId: tiendaId,
                candidatoId: candidato._id,
                estado: 1
            };

            Postulaciones.insert(postulacion, (err, id)=>{
                if(id){
                    Meteor.defer(()=>{
                        try{
                            PostulacionesUtils.enviarCorreo(vacanteId);
                        }catch (e){
                            console.log('Error al enviar correo de nuevas postulaciones ', e)
                        }

                    });
                    return id
                } else {
                    throw new Meteor.Error(401, 'Error al insertar la postulacion');
                }
            });
        }
    }
});

// activarVistoXCandidato:
// Pone la propiedadad: "PostVistoCandidato" en true (quita la alerta 'nueva postulacion' en el front)
export const activarVistoXCandidato = new ValidatedMethod({
    name: 'postulaciones.activarVistoXCandidato',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para ver los detalles es necesario registrarte y/o iniciar sesión.',
        reason: 'Usuario no logeado'
    },
    validate: Postulaciones.simpleSchema().pick(ID).validator({
        clean: true,
        filter: false
    }),
    run({_id}) {
        return Postulaciones.update({
            _id: _id,
        }, {
            $set: {
                postVistoCandidato: true
            }
        });
    }
});

// activarSelecVistoXCandidato:
// Pone la propiedadad: "PostVistoCandidato" en true (quita la alerta 'nueva postulacion' en el front)
export const activarSelecVistoXCandidato = new ValidatedMethod({
    name: 'postulaciones.activarSelecVistoXCandidato',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para ver los detalles es necesario registrarte y/o iniciar sesión.',
        reason: 'Usuario no logeado'
    },
    validate: Postulaciones.simpleSchema().pick(ID).validator({
        clean: true,
        filter: false
    }),
    run({_id}) {
        return Postulaciones.update({
            _id: _id,
        }, {
            $set: {
                selecVistoCandidato: true
            }
        });
    }
});


const POSTULACIONES_METODOS = _.pluck([registrar, activarVistoXCandidato, activarSelecVistoXCandidato], 'name');
if (Meteor.isServer) {
    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(POSTULACIONES_METODOS, name);
        },
        connectionId() {
            return true;
        },
    }, 5, 1000);
}

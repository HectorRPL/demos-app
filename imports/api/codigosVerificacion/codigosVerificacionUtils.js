/**
 * Created by jvltmtz on 23/01/17.
 */
import {_} from "meteor/underscore";
import {CodigosVerificaion} from "./collection";
import {Candidatos} from "../candidatos/collection";
import {check} from 'meteor/check';

const codigosVerificacionUtils = {
    _enviarSMSCodigo(id, codigo) {
        try {
            TwilioSMS.enviarSMS(id, codigo);
        } catch (e) {
            throw e
        }

    },
    _updateCandidatos(selector){
        const user = Meteor.users.findOne(selector);
        Candidatos.update({propietario: selector._id}, {
            $set: {
                celular: user.phone.number,
                celularVerificado: true,
                paisLada: user.phone.paisCodigo
            }
        });
    },
    afterUpdateCodigoVerificacion(selector, modifier) {

        if (_.has(modifier.$set, 'codigo')) {
            CodigosVerificaion.find(selector, {fields: {codigo: 1}}).forEach(codVerif => {
                this._enviarSMSCodigo(codVerif._id, codVerif.codigo);
            });
        }
    },
    afterRemoveCodigoVerificion(selector){
        this._updateCandidatos(selector);
    }
};

export default codigosVerificacionUtils;

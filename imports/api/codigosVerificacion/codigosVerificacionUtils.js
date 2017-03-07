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
            console.log(e);
            throw e
        }

    },
    _updateUsers(selector){
        Meteor.users.update(selector, {$set: {'phone.verified': true}});
    },
    afterUpdateCodigoVerificacion(selector, modifier) {

        if (_.has(modifier.$set, 'codigo')) {
            CodigosVerificaion.find(selector, {fields: {codigo: 1}}).forEach(codVerif => {
                this._enviarSMSCodigo(codVerif._id, codVerif.codigo);
            });
        }
    },
    afterRemoveCodigoVerificion(selector){
        this._updateUsers(selector);
    }
};

export default codigosVerificacionUtils;

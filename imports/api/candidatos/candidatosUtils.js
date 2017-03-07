/**
 * Created by jvltmtz on 3/03/17.
 */
import {_} from "meteor/underscore";
import {Candidatos} from "./collection";
import {check} from 'meteor/check';

const codigosVerificacionUtils = {
    _actualizarPhoneUsers(candidato) {
        Meteor.users.update({_id: candidato.propietario}, {
            $set: {
                'phone.nomber': candidato.celular,
                'phone.verified': candidato.celularVerificado,
                'phone.paisLada': candidato.paisLada
            }
        });

    },
    afterUpdatePhone(selector, modifier) {
        if (_.has(modifier.$set, 'celularVerificado')) {
            Candidatos.find(selector).forEach(candidato => {
                this._actualizarPhoneUsers(candidato);
            });
        }
    },
    afterRemoveCodigoVerificion(selector){
        this._updateUsers(selector);
    }
};

export default codigosVerificacionUtils;
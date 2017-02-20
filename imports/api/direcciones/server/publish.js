/**
 * Created by jvltmtz on 15/09/16.
 */
import {Meteor} from "meteor/meteor";
import {Direcciones} from "../collection";
import {Candidatos} from "../../candidatos/collection";

if (Meteor.isServer) {
    Meteor.publish('direccion.candidato', function () {
        const candidato = Candidatos.findOne({propietario: this.userId});
        const selector = {propietario: candidato._id};
        return Direcciones.find(selector, {
            fields: {
                fechaCreacion: 0,
                propietario: 0
            }
        });
    });

    Meteor.publish('direcciones.agencia', (agenciaId) => {
        return Direcciones.find(agenciaId);
    });

}
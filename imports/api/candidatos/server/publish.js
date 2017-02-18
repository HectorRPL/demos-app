import {Meteor} from "meteor/meteor";
import {Candidatos} from "../collection";
import {Postulaciones} from "../../postulaciones/collection";


if (Meteor.isServer) {
    Meteor.publish('candidatos.logeado', function () {
        const selector = {propietario: this.userId};
        return Candidatos.find(selector, {
            fields: {
                fechaCreacion: 0,
                propietario: 0
            }
        });
    });

    Meteor.publish('candidatos.selecciones.nuevas', function (candidatoId) {
        let selector = {
            $and: [
                candidatoId,
                {estado: 2},
                {selecVistoCandidato: false}
            ]
        };
        console.log('candidatos.selecciones.nuevas ', selector);
        Counts.publish(this, `count.selecciones.nuevas.${candidatoId.candidatoId}`,
            Postulaciones.find(selector));
    });

    Meteor.publish('candidatos.postulaciones.vistas', function (candidatoId) {
        let selector = {
            $and: [
                candidatoId,
                {estado: 1},
                {postVistoAgencia: true},
                {postVistoCandidato: false}
            ]
        };
        Counts.publish(this, `count.postulaciones.vistas.${candidatoId.candidatoId}`,
            Postulaciones.find(selector));
    });


}

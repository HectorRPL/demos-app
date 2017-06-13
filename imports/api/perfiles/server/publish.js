import {Meteor} from "meteor/meteor";
import {Perfiles} from "../collection";
import {Candidatos} from "../../candidatos/collection";

if (Meteor.isServer) {
    Meteor.publish('perfil.candidato', function () {
        if (this.userId) {
            const candidato = Candidatos.findOne({propietario: this.userId});
            const selector = {candidatoId: candidato._id};
            return Perfiles.find(selector, {
                fields: {
                    fechaCreacion: 0,
                    candidatoId: 0
                }
            });
        } else {
            this.ready
        }

    });
}

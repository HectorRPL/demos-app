import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {Candidatos} from "./collection.js";

const CAMPOS_CANDIDATOS = ['nombre', 'apellidos', 'telefono', 'email', 'nacimientoDia', 'nacimientoMes', 'nacimientoAnio', 'sexo'];
const CAMPO_ID = ['_id'];


// ACTUALIZAR DATOS PERSONALES
export const actualizar = new ValidatedMethod({
    name: 'candidato.actualizarCandidato',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Candidatos.simpleSchema().pick(CAMPO_ID, CAMPOS_CANDIDATOS).validator({
        clean: true,
        filter: false
    }),
    run({_id, nombre, apellidos, telefono, email, nacimientoDia, nacimientoMes, nacimientoAnio, sexo}) {

        return Candidatos.update({
            _id: _id
        }, {
            $set: {
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                email: email,
                nacimientoDia: nacimientoDia,
                nacimientoMes: nacimientoMes,
                nacimientoAnio: nacimientoAnio,
                sexo: sexo
            }
        });
    }
});

export const actualizarFechaNacimiento = new ValidatedMethod({
    name: 'candidato.actualizarFechaNacimiento',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Candidatos.simpleSchema().pick(['nacimientoDia', 'nacimientoMes', 'nacimientoAnio'])
        .validator({
        clean: true,
        filter: false
    }),
    run({nacimientoDia, nacimientoMes, nacimientoAnio}) {

        return Candidatos.update({
            propietario: this.userId
        }, {
            $set: {
                nacimientoDia: nacimientoDia,
                nacimientoMes: nacimientoMes,
                nacimientoAnio: nacimientoAnio
            }
        });
    }
});

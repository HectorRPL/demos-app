import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {_} from "meteor/underscore";
import {Perfiles} from "./collection.js";
import {Candidatos} from "../candidatos/collection.js";

const CAMPOS = [ 'fechaCreacion', 'escolaridadId', 'talla', 'estatura', 'puestoId', 'experiencias', 'habilidades',];

const CAMPO_ID = ['_id'];

// CREAR LA COLLECTION PERFIL
export const crearPerfil = new ValidatedMethod({
    name: 'perfil.crearPerfil',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para crear un perfil necesitas registrarte y/o iniciar sesión.',
        reason: 'Usuario no logeado'
    },
    validate: Perfiles.simpleSchema().pick(CAMPOS).validator({
        clean: true,
        filter: false
    }),
    run({fechaCreacion, escolaridadId, talla, estatura, puestoId, experiencias, habilidades}) {
        if (Meteor.isServer) {
            const candidato = Candidatos.findOne({propietario:this.userId});
            const perfil = {
                candidatoId: candidato._id,
                fechaCreacion,
                escolaridadId,
                talla,
                estatura,
                puestoId,
                experiencias,
                habilidades
            };
            return Perfiles.insert(perfil);
        }

    }
});

// ACTUALIZAR PERFIL
export const actualizaPerfil = new ValidatedMethod({
    name: 'perfil.actualizaPerfil',
    mixins: [LoggedInMixin],
    checkLoggedInError: {
        error: 'noLogeado',
        message: 'Para modificar estos campos necesita registrarse.',
        reason: 'Usuario no logeado'
    },
    validate: Perfiles.simpleSchema().pick(CAMPO_ID, CAMPOS).validator({
        clean: true,
        filter: false
    }),
    run({
        _id,
        escolaridadId,
        talla,
        estatura,
        puestoId,
        experiencias,
        habilidades
    }) {
        const perfil = {
            escolaridadId,
            talla,
            estatura,
            puestoId,
            experiencias,
            habilidades
        };
        return Perfiles.update({
            _id: _id
        }, {
            $set: perfil
        });
    }
});

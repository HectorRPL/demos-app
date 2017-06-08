/**
 * Created by jvltmtz on 22/03/17.
 */
import {SSR} from "meteor/meteorhacks:ssr";
import {Postulaciones} from "./collection.js";
import {Agencias} from "../agencias/collection";
import {Puestos} from "../catalogos/puestos/collection";
import {Estados} from "../catalogos/estados/collection";
import {Vacantes} from "../vacantes/collection";
import {Email} from "meteor/email";

const AGENCIAS_EMAIL = 'Demostradoras con experiencia <postmaster@sandboxb82e8f80c2074fe2aa151f5c42a4aa20.mailgun.org>';
const URL_BASE_VACANTES = 'http://localhost:3001/app/vacantes/postulados/';

PostulacionesUtils = {

    enviarCorreo(vacanteId){
        const selector = {$and: [{vacanteId: vacanteId}, {estado: 1}, {postVistoAgencia: false}]};
        const numPostulaciones = Postulaciones.find(selector).count();
        const vacante = Vacantes.findOne({_id: vacanteId});
        const agencia = Agencias.findOne({_id: vacante.propietario});
        const usuario = Meteor.users.findOne({_id: agencia.propietario});

        let result = {
            numPostulaciones: numPostulaciones,
            marca: vacante.marca,
            puestoDesc: Puestos.findOne({_id: vacante.puestoId}).descripcion,
            estadoDesc: Estados.findOne({_id: vacante.estadoId}).descripcion,
            url: URL_BASE_VACANTES + vacanteId
        };

        SSR.compileTemplate('nuevasPostulaciones', Assets.getText('emailTemplates/nuevasPostulaciones/nuevasPostulaciones.html'));
        Email.send({
            to: usuario.emails[0].address,
            from: AGENCIAS_EMAIL,
            subject: 'Nuevas Postulaciones',
            html: SSR.render('nuevasPostulaciones', result)
        });
    }
};
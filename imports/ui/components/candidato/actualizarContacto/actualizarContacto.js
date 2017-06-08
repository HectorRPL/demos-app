/**
 * Created by jvltmtz on 3/03/17.
 */
import {actualizarCelular, actualizarEmail} from "../../../../api/usuarios/methods.js";
import {name as Alertas} from "../../comun/alertas/alertas";
import {name as ConfirmarCelular} from "./confirmarCelular/confirmarCelular";
import template from "./actualizarContacto.html";

class ActualizarContacto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando1 = false;
        this.cargando2 = false;

        this.helpers({
            datosContacto(){
                return Meteor.user();
            }
        })

    }

    actualizarCel() {
        this.cargando2 = true;
        this.tipoMsj = '';
        const datosCelular = {
            celular: this.datosContacto.phone.number,
            paisLada: this.datosContacto.phone.paisLada
        };
        actualizarCelular.call(datosCelular, this.$bindToContext((err) => {
            if (err) {
                this.msj = 'Error al actualizar el celular.';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Te hemos mando enviado un SMS para verificar el celular.';
                this.tipoMsj = 'success';
            }
            this.cargando2 = false;
        }));
    }

    actualizarMail() {
        this.cargando1 = true;
        this.tipoMsjMail = '';
        const email = this.datosContacto.emails[0].address;
        actualizarEmail.call({email: email}, this.$bindToContext((err)=> {
            if (err) {
                console.log(err);
                this.msjMail = 'No se pudo actualizar el E-Mail, intente mas tarde.';
                this.tipoMsjMail = 'danger';
            } else {
                this.msjMail = 'Te hemos mando enviado un E-Mail para verificar tu correo.';
                this.tipoMsjMail = 'success';
            }
            this.cargando1 = false;
        }));
    }
}

const name = 'actualizarContacto';

// Módulo
export default angular
    .module(name, [
        Alertas,
        ConfirmarCelular
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ActualizarContacto
    });

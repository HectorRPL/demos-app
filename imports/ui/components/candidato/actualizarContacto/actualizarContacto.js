/**
 * Created by jvltmtz on 3/03/17.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {actualizarCelular, actualizarEmail} from "../../../../api/usuarios/methods.js";
import {name as Alertas} from "../../comun/alertas/alertas";
import {name as ConfirmarCelular} from "./confirmarCelular/confirmarCelular";
import "./actualizarContacto.html";

class ActualizarContacto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = true;

        this.helpers({
            datosContacto(){
                return Meteor.user();
            }
        })

    }

    actualizarCel() {
        this.cargando = false;
        this.tipoMsj = '';
        const datosCelular = {
            celular: this.datosContacto.phone.number,
            paisLada: this.datosContacto.phone.paisLada
        };
        actualizarCelular.call(datosCelular, this.$bindToContext((err) => {
            if (err) {
                this.msj = 'Error al actualizar el celular.';
                this.tipoMsj = 'danger';
                this.cargando = true;
            } else {
                this.msj = 'Te hemos mando enviado un SMS para verificar el celular.';
                this.tipoMsj = 'success';
                this.cargando = true;
            }
        }));
    }

    actualizarMail() {
        this.tipoMsjMail = '';
        const email = this.datosContacto.emails[0].address;
        console.log(email);
        actualizarEmail.call({email: email}, this.$bindToContext((err)=> {
            if (err) {
                console.log(err);
                this.msjMail = 'Error al actualizar el E-Mail.';
                this.tipoMsjMail = 'danger';
            } else {
                this.msjMail = 'Te hemos mando enviado un E-Mail para verificar tu correo.';
                this.tipoMsjMail = 'success';
            }
        }));
    }
}

const name = 'actualizarContacto';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        Alertas,
        ConfirmarCelular
    ])
    .component(name, {
        templateUrl: `imports/ui/components/candidato/${name}/${name}.html`,
        controllerAs: name,
        controller: ActualizarContacto
    });

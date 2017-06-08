/**
 * Created by jvltmtz on 12/01/17.
 */
import {name as Alertas} from '../../../comun/alertas/alertas';
import {volverEnviarSMS} from "../../../../../api/twilio/methods";
import template from "./volverEnviarSms.html";

class VolverEnviarSms {
    constructor($scope, $reactive) {
        'ngInject';
        this.tipoMensaje = '';
        this.mensaje = '';
        $reactive(this).attach($scope);

    }

    enviarSMS() {
        this.tipoMsj = '';
        volverEnviarSMS.call({}, this.$bindToContext((err)=> {
            if (err) {
                this.tipoMsj = 'danger';
                this.msj = err.reason;
            } else {
                this.tipoMsj = 'success';
                this.msj = 'El codigo de verificación fue enviado.';
            }
        }));
    }

}

const name = 'volverEnviarSms';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: VolverEnviarSms,
        bindings: {
            telefono: '<'
        }
    });
/**
 * Created by jvltmtz on 12/01/17.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {volverEnviarSMS} from "../../../../../api/twilio/methods";
import "./volverEnviarSms.html";

class VolverEnviarSms {
    constructor($scope, $reactive) {
        'ngInject';
        this.tipoMensaje = '';
        this.mensaje = '';
        $reactive(this).attach($scope);

    }

    enviarSMS() {
        this.tipoMensaje = '';
        volverEnviarSMS.call({}, this.$bindToContext((err)=>{
            if(err){
                this.tipoMensaje = 'danger';
                this.mensaje = err.reason;
            }else{
                this.tipoMensaje = 'success';
                this.mensaje = 'El codigo de verificación fue enviado.';
            }
        }));
    }

}

const name = 'volverEnviarSms';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/registro/registroConfirmacion/${name}/${name}.html`,
        controllerAs: name,
        controller: VolverEnviarSms,
        bindings: {
            telefono: '<'
        }
    });
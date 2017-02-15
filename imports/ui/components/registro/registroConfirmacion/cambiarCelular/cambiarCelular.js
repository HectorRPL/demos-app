/**
 * Created by jvltmtz on 31/01/17.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {cambiarCelular} from "../../../../../api/twilio/methods";
import {name as CodigoPaisCelular} from '../../../comun/inputs/codigoPaisCelular/codigoPaisCelular';
import {name as NumCelular} from '../../../comun/inputs/numCelular/numCelular';
import {name as Alertas} from '../../../comun/alertas/alertas';
import "./cambiarCelular.html";

class CambiarCelular {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tipoMensaje = '';
        this.mensaje = '';
        this.mostrarEdicion = true;
        this.datosCel = {};
    }

    activarEdicion() {
        this.mostrarEdicion = !this.mostrarEdicion;
    }

    cambiar() {
        this.tipoMensaje = '';
        cambiarCelular.call(this.datosCel, this.$bindToContext((err)=>{
            if(err){
                this.tipoAlerta = 'danger';
                this.msjAlerta = err.reason;
            }else{
                this.tipoAlerta= 'success';
                this.msjAlerta =  'Te hemos enviado un codigo de verificacion, al nuevo celular';
            }
        }));
    }



}

const name = 'cambiarCelular';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        CodigoPaisCelular,
        NumCelular,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/registro/registroConfirmacion/${name}/${name}.html`,
        controllerAs: name,
        controller: CambiarCelular
    });
/**
 * Created by jvltmtz on 6/03/17.
 */


/**
 * Created by jvltmtz on 3/03/17.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {verificarCelular} from "../../../../../api/twilio/methods.js";
import {name as Alertas} from "../../../comun/alertas/alertas";
import "./confirmarCelular.html";

class ConfirmarCelular {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = true;

    }

    verificar() {
        this.cargando = false;
        this.tipoMsj = '';
        verificarCelular.call({codigo: this.codigo}, this.$bindToContext((err) => {
            if (err) {
                this.msj = err.reason;
                this.tipoMsj = 'danger';
                this.cargando = true;
            } else {
                this.msj = 'Celular verificado.';
                this.tipoMsj = 'success';
                this.cargando = true;
            }
        }));
    }

}

const name = 'confirmarCelular';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/candidato/actualizarContacto/${name}/${name}.html`,
        controllerAs: name,
        controller: ConfirmarCelular
    });

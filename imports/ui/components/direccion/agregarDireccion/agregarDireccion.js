import angular from "angular";
import angularMeteor from "angular-meteor";
import angularMessages from "angular-messages";
import {crear} from "../../../../api/direcciones/methods.js";
import "./agregarDireccion.html";

class AgregarDireccion {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.direccion = {};

    }

    guardar() {
        this.cargando = false;
        crear.call(this.direccion, this.$bindToContext((err) => {
            this.respuesta.mostrar = true;
            if (err) {
                this.respuesta.mensaje = ' No se pudieron guardar los datos. ' + err;
                this.respuesta.tipo = 'danger';
            } else {
                this.$state.go('inicio.registro.perfil');
            }
        }));
    }
}

const name = 'agregarDireccion';

// create a module
export default angular.module(name, [
    angularMeteor,
    angularMessages
]).component(name, {
    templateUrl: `imports/ui/components/direccion/${name}/${name}.html`,
    controllerAs: name,
    controller: AgregarDireccion
});

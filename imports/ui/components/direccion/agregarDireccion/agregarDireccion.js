import {crear} from "../../../../api/direcciones/methods.js";
import template from "./agregarDireccion.html";

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
                this.$state.go('demos.registro.perfil');
            }
        }));
    }
}

const name = 'agregarDireccion';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarDireccion
    });

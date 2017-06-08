/**
 * Created by jvltmtz on 25/01/17.
 */
import {name as CodigosPostales} from "../../comun/inputs/codigosPostales/codigosPostales";
import template from "./formaDireccion.html";

class FormaDireccion {
    constructor($scope) {
        'ngInject';
        this.direccion = {};
    }
}

const name = 'formaDireccion';

// create a module
export default angular
    .module(name, [
        CodigosPostales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: FormaDireccion,
        bindings: {
            direccion: '='
        }
    });

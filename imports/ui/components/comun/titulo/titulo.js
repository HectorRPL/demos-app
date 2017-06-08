/**
 * Created by Héctor on 01/12/2016.
 */
import template from "./titulo.html";

class Titulo {
    constructor() {
        'ngInject';
    }
}

const name = 'titulo';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: Titulo,
        bindings: {
            nuevotitulo: '@'
        }
    });


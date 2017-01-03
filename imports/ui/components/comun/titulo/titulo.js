/**
 * Created by Héctor on 01/12/2016.
 */
import angular from "angular";
import "./titulo.html";

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
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        controller: Titulo,
        bindings: {
            nuevotitulo: '@'
        }
    });


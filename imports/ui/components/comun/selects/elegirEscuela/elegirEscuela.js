import angular from "angular";
import angularMeteor from "angular-meteor";
import {Escuelas} from "../../../../../api/catalogos/escuelas/collection.js";
import template from "./elegirEscuela.html";

class ElegirEscuela {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('escuelas');

        this.escolaridad = '';

        this.helpers({
            escuelas() {
                return Escuelas.find();
            }
        });

    }
}

const name = 'elegirEscuela';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            escolaridad: '='
        },
        controller: ElegirEscuela
    });

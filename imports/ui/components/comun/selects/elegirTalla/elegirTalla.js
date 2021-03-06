import angular from "angular";
import angularMeteor from "angular-meteor";
import {Tallas} from "../../../../../api/catalogos/tallas/collection";
import template from "./elegirTalla.html";

class ElegirTalla {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tallas');

        this.talla = '';

        this.helpers({
            tallas() {
                return Tallas.find();
            }
        });

    }
}

const name = 'elegirTalla';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            talla: '='
        },
        controller: ElegirTalla
    });

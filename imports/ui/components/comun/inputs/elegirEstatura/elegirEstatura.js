import angular from "angular";
import angularMeteor from "angular-meteor";
import template from "./elegirEstatura.html";

class elegirEstatura {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'elegirEstatura';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            estatura: '='
        },
        controller: elegirEstatura
    });

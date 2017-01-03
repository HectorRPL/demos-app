import angular from "angular";
import angularMeteor from "angular-meteor";
import "./demos.html";
import {name as Navigation} from "../navigation/navigation";
import {name as Vacantes} from "../vacantes/vacantes";
import {name as MisPostualciones} from "../misPostulaciones/misPostulaciones";
import {name as MiCuenta} from "../miCuenta/miCuenta";
import {name as Logout} from "../logout/logout";

class Demos {
}

const name = 'demos';
// create a module

export default angular.module(name, [
    angularMeteor,
    Navigation,
    Vacantes,
    MisPostualciones,
    MiCuenta,
    Logout
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Demos
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('demos', {
            url: '/app',
            template: '<demos></demos>',
            abstract: true
        });
}

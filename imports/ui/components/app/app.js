import angular from "angular";
import angularMeteor from "angular-meteor";
import "./app.html";
import {name as Navigation} from "../navigation/navigation";
import {name as Vacantes} from "../vacantes/vacantes";
import {name as MisPostualciones} from "../misPostulaciones/misPostulaciones";
import {name as MiCuenta} from "../miCuenta/miCuenta";
import {name as Logout} from "../logout/logout";

class App {
}

const name = 'app';
// create a module

export default angular
    .module(name, [
    angularMeteor,
    Navigation,
    Vacantes,
    MisPostualciones,
    MiCuenta,
    Logout
])
    .component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: App
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app', {
            url: '/app',
            template: '<app></app>',
            abstract: true,
            resolve: {
                currentUser($q) {
                    if (Meteor.user() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}

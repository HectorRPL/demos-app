import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import "./inicio.html";
import {name as Login} from "../login/login";
import {name as DemosFooter} from "../footer/demosFooter";

class Inicio {
    constructor() {
        'ngInject';
        this.titulo = '¡Únete a Demostradoras!';
    }
}

const name = 'inicio';
// create a module

export default angular.module(name, [
    angularMeteor,
    uiRouter,
    DemosFooter,
    Login
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Inicio
})
    .config(config)
    .run(run);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio', {
            url: '/inicio',
            template: '<inicio></inicio>',
            abstract: true
        });

}
function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('inicio.login');
            }
        }
    );
}

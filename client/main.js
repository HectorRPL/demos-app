import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as Inicio} from '../imports/ui/components/inicio/inicio';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap-social/bootstrap-social.css';
import uiRouter from 'angular-ui-router';


class Main {
}

const name = 'main';
// create a module

export default angular.module('demostradorasApp', [
    angularMeteor,
    uiRouter,
    Inicio
])
    .config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/inicio/login');

}

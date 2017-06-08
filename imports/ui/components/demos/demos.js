import angular from "angular";
import angularMeteor from "angular-meteor";
import angularMessages from "angular-messages";
import ngSanitize from 'angular-sanitize';
import angularUiBootstrap from "angular-ui-bootstrap";
import uiRouter from "angular-ui-router";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-social/bootstrap-social.css";
import webTemplate from './web.html';
import mobileTemplate from './mobile.html'
import {name as Login} from "../login/login";
import {name as DemosFooter} from "../footer/demosFooter";

const template = Meteor.isCordova ? mobileTemplate : webTemplate;

class Demos {
    constructor() {
        'ngInject';
        this.titulo = '¡Únete a Demostradoras!';
    }
}

const name = 'demos';
// create a module

export default angular
    .module(name, [
        angularMeteor,
        angularMessages,
        ngSanitize,
        uiRouter,
        angularUiBootstrap,
        DemosFooter,
        Login
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Demos
    })
    .config(config)
    .run(run);

function config($stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/demos/login');

    $stateProvider
        .state('demos', {
            url: '/demos',
            template: '<demos></demos>',
            abstract: true
        });

}
function run($rootScope, $state) {
    'ngInject';

    $rootScope.$on('$stateChangeError',
        (event, toState, toParams, fromState, fromParams, error) => {
            if (error === 'AUTH_REQUIRED') {
                $state.go('demos.login');
            }else if(error === 'NO_VERIFIED'){
                $state.go('demos.registro.confirmacion');
            }
        }
    );
}

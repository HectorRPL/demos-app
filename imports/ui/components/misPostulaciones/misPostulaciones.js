import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import {name as PostEnProceso} from './postEnproceso/postEnproceso';
import {name as PostSeleccionada} from './postSeleccionada/postSeleccionada';

import './misPostulaciones.html';

class MisPostulaciones {

    constructor() {
        'ngInject';
        this.titulo= 'Estado Principal de postulaciones';
    }
}

const name = 'misPostulaciones';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ngAnimate,
        PostEnProceso,
        PostSeleccionada
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: MisPostulaciones
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('demos.postulaciones', {
            url: '/postulaciones',
            template: '<mis-postulaciones></mis-postulaciones>',
            abstract: true
        });
}

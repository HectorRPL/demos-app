import ngAnimate from "angular-animate";
import {name as PostEnProceso} from "./postEnproceso/postEnproceso";
import {name as PostSeleccionada} from "./postSeleccionada/postSeleccionada";
import template from "./misPostulaciones.html";

class MisPostulaciones {

    constructor() {
        'ngInject';
        this.titulo = 'Estado Principal de postulaciones';
    }
}

const name = 'misPostulaciones';

// Módulo
export default angular
    .module(name, [
        ngAnimate,
        PostEnProceso,
        PostSeleccionada
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: MisPostulaciones
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.postulaciones', {
            url: '/postulaciones',
            template: '<mis-postulaciones></mis-postulaciones>',
            abstract: true
        });
}

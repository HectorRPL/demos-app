import {name as Titulo} from "../comun/titulo/titulo";
import template from "./vacantes.html";
import {name as ListaVacantes} from "./listaVacantes/listaVacantes";

class Vacantes {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.nuevotitulo = 'Vacantes';
    }
}

const name = 'vacantes';

// Módulo
export default angular
    .module(name, [
        Titulo,
        ListaVacantes
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Vacantes
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes', {
            url: '/vacantes',
            template: '<vacantes></vacantes>',
            abstract: true
        });
}

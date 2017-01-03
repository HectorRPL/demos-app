import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {name as Titulo} from "../comun/titulo/titulo";
import "./vacantes.html";
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
        angularMeteor,
        uiRouter,
        Titulo,
        ListaVacantes
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Vacantes
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('demos.vacantes', {
            url: '/vacantes',
            template: '<vacantes></vacantes>',
            abstract: true
        });
}

/**
 * Created by jvltmtz on 26/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './registroDatos.html';
import {name as Facebook} from '../../login/facebook';
import {name as AgregarCandidato} from '../../candidato/agregarCandidato/agregarCandidato'

class RegistroDatos {
}

const name = 'registroDatos';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        AgregarCandidato,
        Facebook
    ])
    .component(name, {
        templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
        controllerAs: name,
        controller: RegistroDatos
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('demos.registro.datos', {
            url: '/datos',
            template: '<registro-datos></registro-datos>'
        });
}

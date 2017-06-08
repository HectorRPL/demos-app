/**
 * Created by jvltmtz on 26/09/16.
 */
import template from "./registroDatos.html";
import {name as Facebook} from "../../login/facebook";
import {name as AgregarCandidato} from "../../candidato/agregarCandidato/agregarCandidato";

class RegistroDatos {
}

const name = 'registroDatos';

// create a module
export default angular
    .module(name, [
        AgregarCandidato,
        Facebook
    ])
    .component(name, {
        template,
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

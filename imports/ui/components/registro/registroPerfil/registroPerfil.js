/**
 * Created by jvltmtz on 19/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './registroPerfil.html';
import { name as AgregarPerfil } from '../../perfilLaboral/agregarPerfil/agregarPerfil';
import { name as ConfirmacionRegisro } from '../confirmacionRegistro/confirmacionRegistro';

class RegistroPerfil {
}

const name = 'registroPerfil';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        AgregarPerfil,
        ConfirmacionRegisro
    ])
    .component(name, {
        templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
        controllerAs: name,
        controller: RegistroPerfil
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.registro.perfil', {
            url: '/perfil',
            template: '<registro-perfil></registro-perfil>',
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

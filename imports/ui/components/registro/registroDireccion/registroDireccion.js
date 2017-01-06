import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {actualizarEstadoReg} from '../../../../api/bitacoraLogin/methods'
import './registroDireccion.html';
import {name as AgregarDireccion} from '../../direccion/agregarDireccion/agregarDireccion';

class RegistroDireccion {
    constructor(){
        this.actulizarEstado();
    }

    actulizarEstado(){
        actualizarEstadoReg.call({estado: 'inicio.registro.direccion'});
    }
}

const name = 'registroDireccion';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        AgregarDireccion
    ])
    .component(name, {
        templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
        controllerAs: name,
        controller: RegistroDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.registro.direccion', {
            url: '/direccion',
            template: '<registro-direccion></registro-direccion>',
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

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {actualizarEstadoReg} from '../../../../api/bitacoraLogin/methods'
import './confirmacionRegistro.html';

class ConfirmacionRegistro {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.actulizarEstado();
        $reactive(this).attach($scope);
        this.$state = $state;
    }

    verVacantes() {
        this.$state.go('demos.vacantes.lista');
    }
    actulizarEstado(){
        actualizarEstadoReg.call({estado: 'inicio.registro.confirmacion'});
    }
}

const name = 'confirmacionRegistro';
// create a module

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
    controllerAs: name,
    controller: ConfirmacionRegistro
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.registro.confirmacion', {
            url: '/confirmacion',
            template: '<confirmacion-Registro></confirmacion-Registro>',
            resolve: {
                currentUser($q) {
                    if (Meteor.userId() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}

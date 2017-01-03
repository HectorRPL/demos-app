import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './confirmacionRegistro.html';

class ConfirmacionRegistro {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
    }

    verVacantes() {
        this.$state.go('demos.vacantes.lista');
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
        .state('inicio.registro.exito', {
            url: '/exito',
            template: '<registro-exito></registro-exito>',
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

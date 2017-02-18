import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import "./registroExito.html";

class RegistroExito {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
    }

    verVacantes() {
        this.$state.go('demos.vacantes.lista');
    }
}

const name = 'registroExito';
// create a module

// create a module
export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/registro/exito/${name}.html`,
        controllerAs: name,
        controller: RegistroExito
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('demos.registro.exito', {
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

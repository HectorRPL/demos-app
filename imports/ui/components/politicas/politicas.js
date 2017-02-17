import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './politicas.html';

class Politicas {
}

const name = 'politicas';
// create a module

// create a module
export default angular
    .module(name, [
    angularMeteor,
    uiRouter
])
    .component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Politicas
})
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('politicas', {
            url: '/politicas',
            template: '<politicas></politicas>'
        });
}

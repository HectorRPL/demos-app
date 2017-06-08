import template from "./politicas.html";

class Politicas {
}

const name = 'politicas';
// create a module

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
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

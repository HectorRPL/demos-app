import template from "./avisoPrivacidad.html";

class AvisoPrivacidad {
}

const name = 'avisoPrivacidad';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: AvisoPrivacidad
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('aviso', {
            url: '/aviso',
            template: '<aviso-privacidad></aviso-privacidad>'
        });
}

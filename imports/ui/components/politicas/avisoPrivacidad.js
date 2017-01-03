import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import './avisoPrivacidad.html';

class AvisoPrivacidad {
}

const name = 'avisoPrivacidad';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter
]).component(name, {
    templateUrl: `imports/ui/components/politicas/${name}.html`,
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

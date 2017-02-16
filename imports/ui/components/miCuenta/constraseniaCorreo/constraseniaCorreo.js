import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import './constraseniaCorreo.html';

class ConstraseniaCorreo {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'constraseniaCorreo';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/miCuenta/${name}/${name}.html`,
        controllerAs: name,
        controller: ConstraseniaCorreo
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.constraseniaCorreo', {
            url: '/constraseniaCorreo',
            template: '<constrasenia-correo></constrasenia-correo>'
        });
}

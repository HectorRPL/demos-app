import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import uiBootstrap from "angular-ui-bootstrap";
import ngAnimate from "angular-animate";
import "./foto.html";

class Foto {
}

const name = 'foto';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        uiBootstrap,
        ngAnimate
    ])
    .component(name, {
        templateUrl: `imports/ui/components/miCuenta/${name}/${name}.html`,
        controllerAs: name,
        controller: Foto
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.foto', {
            url: '/foto',
            template: '<foto></foto>'
        });
}

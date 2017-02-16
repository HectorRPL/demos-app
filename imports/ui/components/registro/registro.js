import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {name as Politicas} from "../politicas/politicas";
import {name as AvisoPrivacidad} from "../politicas/avisoPrivacidad";
import {name as RegistroDatos} from "./registroDatos/registroDatos";
import {name as RegistroDireccion} from "./registroDireccion/registroDireccion";
import {name as RegistroPerfil} from "./registroPerfil/registroPerfil";
import {name as RegistroFacebook} from "./registroFacebook/registroFacebook";
import {name as RegistroConfirmacion} from "./registroConfirmacion/registroConfirmacion";
import {name as TituloInicio} from "../demos/tituloInicio/tituloInicio";
import "./registro.html";


class Registro {
    constructor() {
        'ngInject';
        this.titulo = '¡Unete a Demostradorasss!';
    }

}

const name = 'registro';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Politicas,
    AvisoPrivacidad,
    RegistroDatos,
    RegistroDireccion,
    RegistroPerfil,
    RegistroFacebook,
    RegistroConfirmacion,
    TituloInicio
]).component(name, {
    templateUrl: `imports/ui/components/registro/${name}.html`,
    controllerAs: name,
    controller: Registro
})

    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('demos.registro', {
            url: '/registro',
            template: '<registro></registro>',
            abstract: true
        });
}

import {name as Politicas} from "../politicas/politicas";
import {name as AvisoPrivacidad} from "../politicas/avisoPrivacidad";
import {name as RegistroDatos} from "./registroDatos/registroDatos";
import {name as RegistroDireccion} from "./registroDireccion/registroDireccion";
import {name as RegistroPerfil} from "./registroPerfil/registroPerfil";
import {name as RegistroFacebook} from "./registroFacebook/registroFacebook";
import {name as RegistroConfirmacion} from "./registroConfirmacion/registroConfirmacion";
import {name as TituloInicio} from "../demos/tituloInicio/tituloInicio";
import template from "./registro.html";

class Registro {
    constructor() {
        'ngInject';
        this.titulo = 'Registro';
    }

}

const name = 'registro';

// create a module
export default angular
    .module(name, [
        Politicas,
        AvisoPrivacidad,
        RegistroDatos,
        RegistroDireccion,
        RegistroPerfil,
        RegistroFacebook,
        RegistroConfirmacion,
        TituloInicio
    ])
    .component(name, {
        template,
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

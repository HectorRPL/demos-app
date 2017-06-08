import {Meteor} from "meteor/meteor";

import webTemplate from './web.html';
import { Login as LoginWeb } from './web';
import mobileTemplate from './mobile.html';
import { Login as LoginMobile } from './mobile';
import {name as Facebook} from "./facebook";
import {name as TituloInicio} from "../demos/tituloInicio/tituloInicio";
import {name as Registro} from "../registro/registro";
import {name as Recuperar} from "./recuperar/recuperar";
import {name as Alertas} from '../comun/alertas/alertas';
import {name as App} from "../app/app";

const name = 'login';

const template = Meteor.isCordova ? mobileTemplate : webTemplate;
const controller = Meteor.isCordova ? LoginMobile : LoginWeb;


// create a module
export default angular
    .module(name, [
        App,
        Facebook,
        TituloInicio,
        Registro,
        Recuperar,
        Alertas
    ])
    .component(name, {
        template,
        controller,
        controllerAs: name
    })

    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('demos.login', {
            url: '/login',
            template: '<login></login>'
        });
}

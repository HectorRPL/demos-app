import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Meteor} from "meteor/meteor";
import {obtenerEstadoReg} from '../../../api/bitacoraLogin/methods';
import "./login.html";
import {name as Registro} from "../registro/registro";
import {name as Facebook} from "./facebook";
import {name as App} from "../app/app";
import {name as Recuperar} from "../recuperar/recuperar";
import {name as TituloInicio} from "../demos/tituloInicio/tituloInicio";


class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Ingresa a Demostradoras';
        this.cargando = true;

        this.credentials = {
            email: '',
            password: ''
        };
        this.error = '';

    }

    login() {
        this.cargando = false;
        this.error = '';
        Meteor.loginWithPassword(this.credentials.email.toLowerCase(), this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.cargando = true;
                    this.error = err;
                } else {
                    obtenerEstadoReg.call({}, this.$bindToContext((err, result)=>{
                        console.log(result);
                        this.$state.go(result);
                        this.cargando = true;
                    }));
                }
            })
        );
    }
}

const name = 'login';

// create a module
export default angular
    .module(name, [
    angularMeteor,
    uiRouter,
    Registro,
    Facebook,
    App,
    Recuperar,
    TituloInicio
])
    .component(name, {
    templateUrl: `imports/ui/components/login/${name}.html`,
    controllerAs: name,
    controller: Login
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

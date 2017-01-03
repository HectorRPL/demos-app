import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Meteor} from "meteor/meteor";
import "./login.html";
import {name as Registro} from "../registro/registro";
import {name as Facebook} from "./facebook";
import {name as Demos} from "../demos/demos";
import {name as Recuperar} from "../recuperar/recuperar";


class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;

        $reactive(this).attach($scope);

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
                    this.$state.go('demos.vacantes.lista');
                    this.cargando = true;
                }
            })
        );
    }
}

const name = 'login';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    Registro,
    Facebook,
    Demos,
    Recuperar,
]).component(name, {
    templateUrl: `imports/ui/components/login/${name}.html`,
    controllerAs: name,
    controller: Login
})

    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.login', {
            url: '/login',
            template: '<login></login>'
        });
}

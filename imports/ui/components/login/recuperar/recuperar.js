import {Accounts} from "meteor/accounts-base";
import {name as ReiniciarContrasenia} from "./reiniciarContrasenia/reiniciarContrasenia";
import template from "./recuperar.html";

class Recuperar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = false;
        this.titulo = 'Recuperar Contraseña';
        this.email = '';
    }

    enviar() {
        this.cargando = true;
        Accounts.forgotPassword({email: this.email}, this.$bindToContext((err) => {
                if (err) {
                    this.msj = '';
                    this.tipoMsj = 'danger';
                    if (err.error === 403) {
                        this.msj = `El usuario ${this.email} no encontrado.`;
                        this.cargando = false;
                    } else {
                        this.msj = err.message;
                        this.cargando = false;
                    }
                } else {
                    this.tipoMsj = 'success';
                    this.msj = 'Se ha enviado un correo de recuperación';
                    this.cargando = false;
                }
            })
        );
    }
}

const name = 'recuperar';

// create a module
export default angular
    .module(name, [
        ReiniciarContrasenia
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Recuperar
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('demos.recuperar', {
            url: '/recuperar',
            template: '<recuperar></recuperar>'
        });
}

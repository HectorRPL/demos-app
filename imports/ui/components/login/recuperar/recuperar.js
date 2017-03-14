import angular from "angular";
import angularMeteor from "angular-meteor";
import {Accounts} from "meteor/accounts-base";
import {name as ReiniciarContrasenia} from "./reiniciarContrasenia/reiniciarContrasenia";
import "./recuperar.html";
class Recuperar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Recuperar Contraseña';
        this.email = '';
    }

    enviar() {
        Accounts.forgotPassword({email: this.email}, this.$bindToContext((err) => {
                this.msj = '';
                if (err) {
                    this.tipoMsj = 'danger';
                    if (err.error === 403) {
                        this.msj = `El usuario ${this.email} no encontrado.`;
                    } else {
                        this.msj = err.message;
                    }
                } else {
                    this.tipoMsj = 'success';
                    this.msj = 'Success';
                    console.log('Success, to send email to backend, I think');
                }
            })
        );
    }
}

const name = 'recuperar';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        ReiniciarContrasenia
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
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

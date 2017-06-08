/**
 * Created by jvltmtz on 14/03/17.
 */
import {Accounts} from 'meteor/accounts-base';
import template from './reiniciarContrasenia.html';

class ReiniciarContrasenia {
    constructor($reactive, $scope, $state, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = false;

        this.titulo = 'Reiniciar Contraseña';
        this.$state = $state;
        this.token = $stateParams.token;

    }

    reiniciar() {
        this.cargando = true;
        this.tipoMsj = '';
        Accounts.resetPassword(this.token, this.newPassword, this.$bindToContext((err) => {
            if (err) {
                console.log(err);
                this.tipoMsj = 'danger';
                this.msj = 'El Token expiró, vuelva a generar otro. Si el problema persiste póngase en contacto con soporte técnico.';
            } else {
                this.tipoMsj = 'success';
                this.msj = 'Se ha cambiado con exito su contraseña.';
            }
            this.cargando = false;
        }));
    }


}

const name = 'reiniciarContrasenia';

// Crear módulo
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: ReiniciarContrasenia
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider.state('demos.reiniciarContrasenia', {
        url: '/reset-password/:token',
        template: '<reiniciar-contrasenia></reiniciar-contrasenia>',
    });
}
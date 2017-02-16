import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {actualizarEstadoReg} from '../../../../api/bitacoraLogin/methods'
import {verificarCelular} from '../../../../api/twilio/methods'
import {name as EnviarSms} from './volverEnviarSms/volverEnviarSms';
import {name as CambiarCelular} from './cambiarCelular/cambiarCelular';
import './registroConfirmacion.html';

class RegistroConfirmacion {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.usuario = '';
        this.actulizarEstado($state.current.name);
        this.subscribe('datosUsuario');
        this.helpers({
            datosUsuario(){
                this.usuario = Meteor.users.findOne();
                return this.usuario
            }
        })
    }

    verficarNumero() {
        this.error = '';
        verificarCelular.call({codigo: this.codigo}, this.$bindToContext((err, result)=> {
            if (err) {
                this.error = err;
            } else {
                this.$state.go('demos.registro.direccion');
            }

        }));

    }

    actulizarEstado(nombreEstado) {
        actualizarEstadoReg.call({estado: nombreEstado}, this.$bindToContext((err) => {

        }));
    }
}

const name = 'registroConfirmacion';
// create a module

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    EnviarSms,
    CambiarCelular
]).component(name, {
    templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
    controllerAs: name,
    controller: RegistroConfirmacion
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('demos.registro.confirmacion', {
            url: '/confirmacion',
            template: '<registro-confirmacion></registro-confirmacion>',
            resolve: {
                currentUser($q) {
                    if (Meteor.user() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}

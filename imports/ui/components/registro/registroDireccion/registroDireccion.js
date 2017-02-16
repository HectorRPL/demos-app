import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import {actualizarEstadoReg} from '../../../../api/bitacoraLogin/methods'
import './registroDireccion.html';
import {name as FormaDireccion} from '../../direccion/formaDireccion/formaDireccion';
import {name as Alertas} from '../../comun/alertas/alertas';
import {crear} from "../../../../api/direcciones/methods";

class RegistroDireccion {
    constructor($scope, $state, $reactive){
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.direccion = {};
        this.actualizarEstado($state.current.name);
    }

    guardar() {
        this.cargando = false;
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        crear.call(direccionFinal, this.$bindToContext((err) => {
            if (err) {
                this.tipoAlerta = 'danger';
                this.msjAlerta = 'No se puedo agregar la dirección.';
            } else {
                this.$state.go('demos.registro.perfil');
            }
        }));
    }

    actualizarEstado(nombreEstado) {
        actualizarEstadoReg.call({estado: nombreEstado}, this.$bindToContext((err)=> {

        }));
    }

}

const name = 'registroDireccion';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        FormaDireccion,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
        controllerAs: name,
        controller: RegistroDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('demos.registro.direccion', {
            url: '/direccion',
            template: '<registro-direccion></registro-direccion>',
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

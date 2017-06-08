import {actualizarEstadoReg} from "../../../../api/bitacoraLogin/methods";
import template from "./registroDireccion.html";
import {name as FormaDireccion} from "../../direccion/formaDireccion/formaDireccion";
import {name as Alertas} from "../../comun/alertas/alertas";
import {crear} from "../../../../api/direcciones/methods";

class RegistroDireccion {
    constructor($scope, $state, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.cargando = false;
        this.direccion = {};
        this.actualizarEstado($state.current.name);
    }

    guardar() {
        this.cargando = true;
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        crear.call(direccionFinal, this.$bindToContext((err) => {
            if (err) {
                console.log(err); // Se deja este console, para manejar el err
                this.tipoAlerta = 'danger';
                this.msjAlerta = 'No se puedo agregar la dirección.';
                this.cargando = false;
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
        FormaDireccion,
        Alertas
    ])
    .component(name, {
        template,
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

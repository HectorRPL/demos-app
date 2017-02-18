/**
 * Created by jvltmtz on 19/09/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {actualizarEstadoReg} from "../../../../api/bitacoraLogin/methods";
import "./registroPerfil.html";
import {name as AgregarPerfil} from "../../perfilLaboral/agregarPerfil/agregarPerfil";

class RegistroPerfil {
    constructor($scope, $state, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.actualizarEstado($state.current.name);
    }

    actualizarEstado(nombreEstado) {
        actualizarEstadoReg.call({estado: nombreEstado}, this.$bindToContext((err)=> {

        }));
    }
}

const name = 'registroPerfil';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        AgregarPerfil
    ])
    .component(name, {
        templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
        controllerAs: name,
        controller: RegistroPerfil
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('demos.registro.perfil', {
            url: '/perfil',
            template: '<registro-perfil></registro-perfil>',
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

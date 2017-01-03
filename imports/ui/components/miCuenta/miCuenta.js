import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import ngAnimate from 'angular-animate';
import {Candidatos} from '../../../api/candidatos/collection.js';
import {Direcciones} from '../../../api/direcciones/collection.js';
import {Perfiles} from '../../../api/perfiles/collection.js';
import {name as ActualizarPerfil} from '../perfilLaboral/actualizarPerfil/actualizarPerfil';
import {name as ActualizarCandidato} from '../candidato/actualizarCandidato/actualizarCandidato';
import {name as ActualizarDireccion} from '../direccion/actualizarDireccion/actualizarDireccion';
import {name as ConstraseniaCorreo} from './constraseniaCorreo/constraseniaCorreo';
import './miCuenta.html';

class MiCuenta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('candidato.logeado');
        this.subscribe('direccion.candidato');
        this.subscribe('perfil.candidato');

        this.nuevotitulo = 'Mi Perfil';
        $scope.oneAtATime = true;
        this.subtitulo1 = 'Mi Perfil Laboral';
        this.subtitulo2 = 'Mis Datos Personales';
        this.subtitulo3 = 'Mi Dirección';
        this.subtitulo4 = 'Mi Correo y Contraseña';

        this.helpers({
            candidato() {
                return Candidatos.findOne();
            },
            perfil() {
                return Perfiles.findOne();
            },
            direccion(){
                return Direcciones.findOne();
            }
        });
    }

}
const name = 'miCuenta';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ngAnimate,
        ActualizarPerfil,
        ActualizarCandidato,
        ActualizarDireccion,
        ConstraseniaCorreo
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: MiCuenta
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('demos.miCuenta', {
            url: '/micuenta',
            template: '<mi-cuenta></mi-cuenta>',
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

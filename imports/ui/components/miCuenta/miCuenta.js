import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import ngAnimate from "angular-animate";
import {Candidatos} from "../../../api/candidatos/collection.js";
import {Direcciones} from "../../../api/direcciones/collection.js";
import {Perfiles} from "../../../api/perfiles/collection.js";
import {name as ActualizarPerfil} from "../perfilLaboral/actualizarPerfil/actualizarPerfil";
import {name as ActualizarCandidato} from "../candidato/actualizarCandidato/actualizarCandidato";
import {name as ActualizarDireccion} from "../direccion/actualizarDireccion/actualizarDireccion";
import {name as CambiarContrasenia} from "./cambiarContrasenia/cambiarContrasenia";
import {name as ActualizarContacto} from "./../candidato/actualizarContacto/actualizarContacto";
import "./miCuenta.html";

class MiCuenta {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('candidato.logeado');
        this.subscribe('direccion.candidato');
        this.subscribe('perfil.candidato');

        this.nuevotitulo = 'Mi Perfil';
        $scope.oneAtATime = true;
        this.tituloPerfil = 'Perfil Laboral';
        this.tituloContacto = 'Datos de contacto';
        this.tituloDatos = 'Datos Personales';
        this.tituloDireccion = 'Dirección';
        this.tituloPassword = 'Cambiar Contraseña';

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
        CambiarContrasenia,
        ActualizarContacto
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
        .state('app.miCuenta', {
            url: '/micuenta',
            template: '<mi-cuenta></mi-cuenta>'
        });
}

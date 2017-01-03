/**
 * Created by jvltmtz on 26/09/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import angularMessages from "angular-messages";
import {crear} from "../../../../api/direcciones/methods.js";
import {obtenerColonias} from "../../../../api/codigosPostales/methods.js";
import {actualizarRegFacebook} from "../../../../api/candidatos/methods.js";
import {Candidatos} from "../../../../api/candidatos/collection";
import {name as ElegirAnio} from "../../comun/selects/elegirFechaNacimiento/elegirAnio/elegirAnio";
import {name as ElegirMes} from "../../comun/selects/elegirFechaNacimiento/elegirMes/elegirMes";
import {name as ElegirDia} from "../../comun/selects/elegirFechaNacimiento/elegirDia/elegirDia";

import "./registroFacebook.html";

class RegistroFacebook {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.respuesta = {
            mostrar: false,
            mensaje: '',
            tipo: ''
        };
        this.colonias = {};
        this.direccion = {};
        this.fechaNacimiento = {};
        this.subscribe('candidatos.logeado');
        this.helpers({
            candidato(){
                return Candidatos.findOne();
            }
        });

    }

    obtenerColonias() {
        obtenerColonias.call({
            cp: this.direccion.codigoPostal
        }, (err, result) => {
            if (Array.isArray(result) && result.length > 0) {
                this.colonias = result;
                this.direccion.estado = this.colonias[0].estado;
                this.direccion.estadoId = this.colonias[0].codigoEstado;
                this.direccion.delMpio = this.colonias[0].delegacionMunicipio;
            } else {
                this.colonias = [];
                this.direccion.estado = '';
                this.direccion.estadoId = '';
                this.direccion.delMpio = '';
            }
        });
    }

    guardar() {
        crear.call(this.direccion, this.$bindToContext((err) => {
            if (err) {
                this.respuesta.mensaje = ' No se pudieron guardar la registroDireccion. ' + err;
                this.respuesta.tipo = 'danger';
            } else {
                this.actulaizarDatosCandidato();

            }
        }));
    }

    actulaizarDatosCandidato(){
        actualizarRegFacebook.call(this.datos, this.$bindToContext((err) => {
            this.respuesta.mostrar = true;
            if (err) {
                this.respuesta.mensaje = ' No se pudo guardar la fecha de nacimiento. ' + err;
                this.respuesta.tipo = 'danger';
            } else {
                this.$state.go('inicio.registro.perfil');
            }
        }));
    }
}

const name = 'registroFacebook';

// create a module
export default angular.module(name, [
    angularMeteor,
    angularMessages,
    ElegirAnio,
    ElegirMes,
    ElegirDia
]).component(name, {
    templateUrl: `imports/ui/components/registro/${name}/${name}.html`,
    controllerAs: name,
    controller: RegistroFacebook
}).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('inicio.registro.facebook', {
            url: '/facebook',
            template: '<registro-facebook></registro-facebook>',
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


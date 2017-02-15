/**
 * Created by jvltmtz on 26/09/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import angularMessages from "angular-messages";
import {actualizarEstadoReg} from "../../../../api/bitacoraLogin/methods";
import {actualizarRegFacebook} from "../../../../api/usuarios/methods";
import {Candidatos} from "../../../../api/candidatos/collection";
import {Paises} from "../../../../api/catalogos/paises/collection";
import {name as ElegirAnio} from "../../comun/selects/elegirFechaNacimiento/elegirAnio/elegirAnio";
import {name as ElegirMes} from "../../comun/selects/elegirFechaNacimiento/elegirMes/elegirMes";
import {name as ElegirDia} from "../../comun/selects/elegirFechaNacimiento/elegirDia/elegirDia";
import {name as CodigosPostales} from "../../comun/inputs/codigosPostales/codigosPostales";
import {name as NumCelular} from "../../comun/inputs/numCelular/numCelular";
import {name as CodigoPaisCelular} from "../../comun/inputs/codigoPaisCelular/codigoPaisCelular";
import {name as Alerts} from "../../comun/alertas/alertas";
import "./registroFacebook.html";

class RegistroFacebook {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.actualizarEstado($state.current.name);
        this.$state = $state;
        this.paisId = 'MX';
        this.datos = {};
        this.subscribe('candidatos.logeado');
        this.subscribe('paises', ()=> [{_id: this.paisId}]);
        this.helpers({
            candidatoReg(){
                return Candidatos.findOne();
            },
            pais(){
                return Paises.findOne();
            }
        });

    }

    guardar() {
        actualizarRegFacebook.call(this.datos, this.$bindToContext((err)=>{
            if(err){
                this.tipoAlerta = 'danger';
                this.msjAlerta = err.message;
            }else{
                this.$state.go('inicio.registro.confirmacion');
            }
        }));
    }


    actualizarEstado(nombreEstado) {
        actualizarEstadoReg.call({estado: nombreEstado}, this.$bindToContext((err)=>{

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
    ElegirDia,
    CodigosPostales,
    Alerts,
    NumCelular,
    CodigoPaisCelular
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


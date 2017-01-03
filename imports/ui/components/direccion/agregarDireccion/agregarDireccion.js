import angular from "angular";
import angularMeteor from "angular-meteor";
import angularMessages from "angular-messages";
import angularUiBootstrap from "angular-ui-bootstrap";
import {crear} from "../../../../api/direcciones/methods.js";
import {obtenerColonias} from "../../../../api/codigosPostales/methods.js";

import "./agregarDireccion.html";

class AgregarDireccion {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = true;
        this.$state = $state;
        this.respuesta = {
            mostrar: false,
            mensaje: '',
            tipo: ''
        };
        this.colonias = [];
        this.direccion =  {
            codigoPostal: '',
            estado: '',
            delMpio: '',
            colonia: '',
            calle: '',
            numExt: '',
            numInt: '',
            estadoId: ''
        };
    }

    guardar() {
        this.cargando = false;
        crear.call(this.direccion, this.$bindToContext((err) => {
            this.respuesta.mostrar = true;
            if (err) {
                this.respuesta.mensaje = ' No se pudieron guardar los datos. ' + err;
                this.respuesta.tipo = 'danger';
                this.cargando = true;
            } else {
                this.$state.go('inicio.registro.perfil');
                this.cargando = true;
            }
        }));
    }
}

const name = 'agregarDireccion';

// create a module
export default angular.module(name, [
    angularMeteor,
    angularMessages,
    angularUiBootstrap,
]).component(name, {
    templateUrl: `imports/ui/components/direccion/${name}/${name}.html`,
    controllerAs: name,
    controller: AgregarDireccion
}).directive('codigoPostal', ['$q', function ($q) {
    return {
        restrict: 'EA',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$asyncValidators.codigopostal = function (modelValue, viewValue) {
                let codigoPostal = modelValue || viewValue;
                return obtenerColonias.callPromise({
                    cp: codigoPostal
                }).then(function(result){
                    scope.agregarDireccion.colonias = result;
                    if (result.length === 0) {
                        scope.agregarDireccion.direccion.estado = '';
                        scope.agregarDireccion.direccion.delMpio = '';
                        return $q.reject('No encontrado');
                    } else {
                        scope.agregarDireccion.direccion.estado = result[0].estado;
                        scope.agregarDireccion.direccion.estadoId = result[0].codigoEstado;
                        scope.agregarDireccion.direccion.delMpio = result[0].delegacionMunicipio;
                    }
                }).catch(function(err){
                    return $q.reject('No encontrado');
                });
            };
        }
    };
}]);

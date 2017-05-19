import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import ngMessages from "angular-messages";
import {name as Alertas} from "../../comun/alertas/alertas";
import {obtenerColonias} from "../../../../api/codigosPostales/methods.js";
import {actualizar} from "../../../../api/direcciones/methods";
import "./actualizarDireccion.html";

class ActualizarDireccion {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.cargando = false;
        this.colonias = [];
        this.direccion = {
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

    actualizar() {
        this.cargando = true;
        this.tipoMsj = '';
        actualizar.call(this.direccion, this.$bindToContext((err) => {
            if (err) {
                this.msj = 'Error al actualizar la direccion.';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Se actualiza la direccion correctamente.';
                this.tipoMsj = 'success';
            }
            this.cargando = false;
        }));
    }

}

const name = 'actualizarDireccion';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ngMessages
    ])
    .component(name, {
        templateUrl: `imports/ui/components/direccion/${name}/${name}.html`,
        controllerAs: name,
        controller: ActualizarDireccion,
        bindings: {
            direccion: '<',
            id: '<'
        }
    })
    .directive('codigopostal', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.codigopostal = function (modelValue, viewValue) {
                    let codigopostal = modelValue || viewValue;
                    return obtenerColonias.callPromise({
                        cp: codigopostal
                    }).then(function (result) {
                        scope.actualizarDireccion.colonias = result;
                        if (result.length === 0) {
                            scope.actualizarDireccion.direccion.estado = '';
                            scope.actualizarDireccion.direccion.delMpio = '';
                            return $q.reject('No encontrado');
                        } else {
                            scope.actualizarDireccion.direccion.estado = result[0].estado;
                            scope.actualizarDireccion.direccion.estadoId = result[0].codigoEstado;
                            scope.actualizarDireccion.direccion.delMpio = result[0].delegacionMunicipio;
                        }
                    }).catch(function (err) {
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);

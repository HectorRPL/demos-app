import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import ngMessages from "angular-messages";
import {obtenerColonias} from "../../../../api/codigosPostales/methods.js";
import {actualizar} from "../../../../api/direcciones/methods";
import "./actualizarDireccion.html";

class ActualizarDireccion {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.cargando = true;

        this.respuesta = {
            mostrar: false,
            mensaje: '',
            tipo: ''
        };
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
        this.cargando = false;
        actualizar.call(this.direccion, this.$bindToContext((err) => {
            this.respuesta.mostrar = true;
            if (err) {
                this.respuesta.mensaje = ' No se pudieron realizar los cambios.' + err;
                this.respuesta.tipo = 'danger';
                this.cargando = true;
            } else {
                this.respuesta.mensaje = ' Los cambios se guardaron correctamente.';
                this.respuesta.tipo = 'success';
                this.cargando = true;
            }
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

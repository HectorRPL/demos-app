/**
 * Created by jvltmtz on 10/01/17.
 */
import {obtenerColonias} from "../../../../../api/codigosPostales/methods.js";
import template from "./codigosPostales.html";

class CodigosPostales {
    constructor($scope) {
        'ngInject';
        this.colonias = {};
        this.direccion = {};
    }
}

const name = 'codigosPostales';
// create a module

export default angular
    .module(name, [
    ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            direccion: '='
        },
        controller: CodigosPostales
    })
    .directive('cpInvalido', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.cpinvalido = function (modelValue, viewValue) {
                    let codigoPostal = modelValue || viewValue;
                    return obtenerColonias.callPromise({
                        cp: codigoPostal
                    }).then(function (result) {
                        scope.codigosPostales.direccion.colonias = result;
                        if (result.length === 0) {
                            scope.codigosPostales.direccion.estado = '';
                            scope.codigosPostales.direccion.delMpio = '';
                            return $q.reject('No encontrado');
                        } else {
                            scope.codigosPostales.direccion.estado = result[0].estado;
                            scope.codigosPostales.direccion.estadoId = result[0].codigoEstado;
                            scope.codigosPostales.direccion.delMpio = result[0].delegacionMunicipio;
                        }
                    }).catch(function (err) {
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);
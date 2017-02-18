/**
 * Created by jvltmtz on 13/08/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {obtenerColonias} from "../../../api/codigosPostales/methods.js";


const name = 'ngCp';

// Módulo
export default angular
    .module('demostradorasApp', [
        angularMeteor,
    ])
    .directive(name, ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.ngCp = function (modelValue, viewValue) {
                    console.log('Imprimiendo modelValue:', modelValue);
                    console.log('Imprimiendo viewValue:', viewValue);
                    /*
                    let codigoPostal = modelValue || viewValue;
                    return obtenerColonias.call({
                        cp: codigoPostal
                    }, (err, result) => {
                        console.log('esto es result:', result);
                        scope.colonias = result;
                        if (Array.isArray(result) && result.length === 0) {
                            return $q.reject('No encontrado');
                        }
                    });
                    */
                };
            }
        };
    }]);
/**
 * Created by jvltmtz on 16/01/17.
 */
import {existeCelular} from "../../../../../api/usuarios/methods";
import template from "./numCelular.html";

class NumCelular {
    constructor($scope) {
        'ngInject';
        this.celular = '';
    }

}

const name = 'numCelular';
// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: NumCelular,
        bindings: {
            paislada: '<',
            celular: '='
        }
    })
    .directive('celInvalido', ['$q', function ($q) {
        return {
            restrict: 'EA',
            require: '?ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$asyncValidators.celInvalido = function (modelValue, viewValue) {
                    let celular = modelValue || viewValue;
                    return existeCelular.callPromise({
                        celular: celular,
                        codigoLada: scope.numCelular.paislada
                    }).then(function (result) {
                        console.log(celular);
                        console.log(scope.numCelular.paislada);
                        if (result > 0) {
                            return $q.reject('No encontrado');
                        }
                    }).catch(function (err) {
                        console.log(err);
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);
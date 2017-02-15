/**
 * Created by jvltmtz on 16/01/17.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {existeCelular} from "../../../../../api/usuarios/methods";
import "./numCelular.html";

class NumCelular {
    constructor($scope) {
        'ngInject';
        this.celular = '';
    }

}

const name = 'numCelular';
// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/${name}/${name}.html`,
        controllerAs: name,
        controller: NumCelular,
        bindings: {
            paislada: '<',
            celular: '='
        }
    }).directive('celInvalido', ['$q', function ($q) {
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
                        if (result > 0) {
                            return $q.reject('No encontrado');
                        }
                    }).catch(function (err) {
                        return $q.reject('No encontrado');
                    });
                };
            }
        };
    }]);
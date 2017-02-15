/**
 * Created by jvltmtz on 16/01/17.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {Paises} from "../../../../../api/catalogos/paises/collection";
import "./codigoPaisCelular.html";

class CodigoPaisCelular {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('paises', ()=>[{_id: 'MX'}]);
        this.helpers({
            pais(){
                return Paises.findOne({_id: 'MX'});
            }
        })
    }

    $doCheck(){
        this.paislada = '1';
    }

}

const name = 'codigoPaisCelular';
// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/inputs/${name}/${name}.html`,
        controllerAs: name,
        controller: CodigoPaisCelular,
        bindings: {
            iso2: '<',
            paislada: '='
        }
    });
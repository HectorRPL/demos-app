/**
 * Created by jvltmtz on 16/01/17.
 */
import {Paises} from "../../../../../api/catalogos/paises/collection";
import template from "./codigoPaisCelular.html";

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

    $doCheck() {
        this.paislada = '1';
    }

}

const name = 'codigoPaisCelular';
// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: CodigoPaisCelular,
        bindings: {
            iso2: '<',
            paislada: '='
        }
    });
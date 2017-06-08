/**
 * Created by Héctor on 28/02/2017.
 */
import template from "./tiendaPostulacion.html";

class TiendaPostulacion {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        // El ng-repeat necesita la tienda, la cual es obtenida por medio de un binding de angular
        this.helpers({
            tienda(){
                return this.tienda;
            }
        });
    }

}

const name = 'tiendaPostulacion';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: TiendaPostulacion,
        bindings: {
            tienda: '<'
        }
    });


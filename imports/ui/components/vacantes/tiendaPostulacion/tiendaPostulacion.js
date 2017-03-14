/**
 * Created by Héctor on 28/02/2017.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import "./tiendaPostulacion.html";

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
    .module(name, [
        angularMeteor,
        uiRouter
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: TiendaPostulacion,
        bindings: {
            tienda: '<'
        }
    });


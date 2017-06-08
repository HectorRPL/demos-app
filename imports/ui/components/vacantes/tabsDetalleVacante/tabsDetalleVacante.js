/**
 * Created by Héctor on 28/02/2017.
 */
import template from "./tabsDetalleVacante.html";

class TabsDetalleVacante {
    constructor() {
        'ngInject';
    }
}

const name = 'tabsDetalleVacante';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: TabsDetalleVacante,
        bindings: {
            vacante: '<'
        }
    });

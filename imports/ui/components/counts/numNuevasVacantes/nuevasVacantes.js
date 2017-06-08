/**
 * Created by Héctor on 19/12/2016.
 */
import template from "./nuevasVacantes.html";

class NuevasVacantes {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'nuevasVacantes';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: NuevasVacantes
    });


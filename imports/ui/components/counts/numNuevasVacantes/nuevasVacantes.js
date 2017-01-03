/**
 * Created by Héctor on 19/12/2016.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import "./nuevasVacantes.html";

class NuevasVacantes {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'nuevasVacantes';

// Módulo
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/navigation/alertas/${name}/${name}.html`,
        controllerAs: name,
        controller: NuevasVacantes
    });


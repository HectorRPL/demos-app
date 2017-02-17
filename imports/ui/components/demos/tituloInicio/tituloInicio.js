/**
 * Created by jvltmtz on 27/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './tituloInicio.html';

class TituloInicio {
    constructor() {
        'ngInject';
    }

}

const name = 'tituloInicio';

// create a module
export default angular
    .module(name, [
    angularMeteor
])
    .component(name, {
    templateUrl: `imports/ui/components/demos/${name}/${name}.html`,
    controllerAs: name,
    controller: TituloInicio,
    bindings: {
        titulo: '<'
    }
});
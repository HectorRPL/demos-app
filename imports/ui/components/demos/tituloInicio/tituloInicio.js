/**
 * Created by jvltmtz on 27/09/16.
 */
import template from "./tituloInicio.html";

class TituloInicio {
    constructor() {
        'ngInject';
    }

}

const name = 'tituloInicio';

// create a module
export default angular
    .module(name, [
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: TituloInicio,
        bindings: {
            titulo: '<'
        }
    });
import template from "./vacantesOrdenar.html";

class VacantesOrdenar {
    constructor() {
        this.changed();
    }

    changed() {
        this.onChange({
            sort: {
                [this.property]: parseInt(this.order)
            }
        });
    }
}

const name = 'vacantesOrdenar';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
        bindings: {
            onChange: '&',
            property: '@',
            order: '@'
        },
        controllerAs: name,
        controller: VacantesOrdenar
    });
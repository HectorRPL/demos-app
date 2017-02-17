import angular from 'angular';
import angularMeteor from 'angular-meteor';

import  './vacantesOrdenar.html';

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
    .module(name, [
    angularMeteor
])
    .component(name, {
    templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
    bindings: {
        onChange: '&',
        property: '@',
        order: '@'
    },
    controllerAs: name,
    controller: VacantesOrdenar
});
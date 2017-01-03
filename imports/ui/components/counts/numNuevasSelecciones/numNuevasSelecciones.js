/**
 * Created by Héctor on 19/12/2016.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import "./numNuevasSelecciones.html";

class NumNuevasSelecciones {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('candidatos.selecciones.nuevas', ()=>[{candidatoId: this.getReactively('candidatoid')}]);
        this.helpers({
            totalSelecciones() {
                return Counts.get(`count.selecciones.nuevas.${this.candidatoid}`);
            }
        });
    }
}

const name = 'numNuevasSelecciones';

// Módulo
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/counts/${name}/${name}.html`,
        controllerAs: name,
        controller: NumNuevasSelecciones,
        bindings: {
            candidatoid: '<'
        }
    });


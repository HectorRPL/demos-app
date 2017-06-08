/**
 * Created by Héctor on 19/12/2016.
 */
import template from "./numNuevasSelecciones.html";

class NumNuevasSelecciones {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('candidatos.selecciones.nuevas',
            ()=>[{candidatoId: this.getReactively('candidatoid')}]);
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
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: NumNuevasSelecciones,
        bindings: {
            candidatoid: '<'
        }
    });


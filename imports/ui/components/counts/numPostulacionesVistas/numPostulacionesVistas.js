/**
 * Created by Héctor on 19/12/2016.
 */
import template from "./numPostulacionesVistas.html";

class NumPostulacionesVistas {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('candidatos.postulaciones.vistas', ()=>[{candidatoId: this.getReactively('candidatoid')}]);
        this.helpers({
            totalPostulacionesVistas() {
                return Counts.get(`count.postulaciones.vistas.${this.candidatoid}`);
            }
        });

    }
}

const name = 'numPostulacionesVistas';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: NumPostulacionesVistas,
        bindings: {
            candidatoid: '<'
        }
    });


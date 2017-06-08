/**
 * Created by jvltmtz on 30/12/16.
 */
import template from "./estoyPostulado.html";

class EstoyPostulado {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('vacantes.candidato.postulado', ()=> [{vacanteId: this.getReactively('vacanteid')}]);
        this.helpers({
            postulado() {
                const result = Counts.get(`count.vacante.candidato.postulado.${this.vacanteid}`);
                if (result > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        });
    }
}

const name = 'estoyPostulado';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: EstoyPostulado,
        bindings: {
            vacanteid: '<',
            totaltiendas: '<'
        }
    })
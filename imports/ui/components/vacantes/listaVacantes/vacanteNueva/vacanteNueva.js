/**
 * Created by jvltmtz on 30/12/16.
 */
import angular from "angular";
import "./vacanteNueva.html";

class VacanteNueva {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.fechaHoy = new Date();
        this.hoy = false;
    }

    $onChanges() {
        if (angular.isDate(this.fechacreacion)) {
            if (this.fechaHoy.getFullYear() === this.fechacreacion.getFullYear() &&
                this.fechaHoy.getMonth() === this.fechacreacion.getMonth() &&
                this.fechaHoy.getDay() === this.fechacreacion.getDay()) {
                this.hoy = true;
            }
        }
    }
}

const name = 'vacanteNueva';

// Módulo
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/listaVacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: VacanteNueva,
        bindings: {
            fechacreacion: '<',
        }
    })
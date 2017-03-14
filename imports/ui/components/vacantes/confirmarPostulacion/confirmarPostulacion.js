import angular from "angular";
import angularMeteor from "angular-meteor";
import "./confirmarPostulacion.html";
import {registrar} from "../../../../api/postulaciones/methods.js";
import {name as Alertas} from "../../comun/alertas/alertas";

class ConfirmarPostulacion {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = true;
        this.$state = $state;

    }

    postularme() {
        this.cargando = false;
        console.log(this.resolve.datosVacante);
        const vacante = this.resolve.datosVacante;
        console.log(vacante);
        const postulacion = {tiendaId: vacante.tienda._id, vacanteId: vacante.vacanteId};
        registrar.call(postulacion, this.$bindToContext((error, result)=> {
            if (error) {
                this.tipoMsj = 'danger';
                this.msj='Error al intentar postularte, intentar mas tarde.';

            } else {
                this.tipoMsj ='success';
                this.msj= '¡Felicitaciones, ya te postulaste para esta vacante!.';

            }
        }));
    }

    cancelarCerrar() {
        this.dismiss();
    }

}

const name = 'confirmarPostulacion';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: ConfirmarPostulacion,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });

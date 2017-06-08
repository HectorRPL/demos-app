import template from "./confirmarPostulacion.html";
import {registrar} from "../../../../api/postulaciones/methods.js";
import {name as Alertas} from "../../comun/alertas/alertas";

class ConfirmarPostulacion {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.cargando = false;
        this.$state = $state;

    }

    postularme() {
        console.log('entró');
        this.cargando = true;
        const vacante = this.resolve.datosVacante;
        const postulacion = {tiendaId: vacante.tienda._id, vacanteId: vacante.vacanteId};
        registrar.call(postulacion, this.$bindToContext((error, result)=> {
            if (error) {
                this.tipoMsj = 'danger';
                this.msj='Error al intentar postularte, intentar mas tarde.';

            } else {
                this.tipoMsj ='success';
                this.msj= '¡Felicitaciones, ya te postulaste para esta vacante!.';
            }
            this.cargando = null;
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
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ConfirmarPostulacion,
        bindings: {
            resolve: '<',
            close: '&',
            dismiss: '&'
        }
    });

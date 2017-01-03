import angular from 'angular';
import angularMeteor from 'angular-meteor';
import './confirmarPostulacion.html';
import {registrar} from '../../../../api/postulaciones/methods.js';

class ConfirmarPostulacion {
    constructor($scope, $reactive, $state) {
        'ngInject';

        $reactive(this).attach($scope);

        this.cargando = true;

        this.$state = $state;
        this.success = {
            tipo: 'success',
            simbolo: 'fa fa-check',
            mensaje: '¡Felicitaciones, ya te postulaste para esta vacante!.'
        };
        this.danger = {
            tipo: 'danger',
            simbolo: 'fa fa-times',
            mensaje: 'Error al intentar postularte, intentar mas tarde.'
        };

    }

    postularme() {
        this.cargando = false;
        const postulacion = {tiendaId: this.datosvacante.tienda._id, vacanteId: this.datosvacante.vacanteId};
         registrar.call(postulacion, this.$bindToContext((error, result)=> {
            if (error) {
                this.respuesta = this.danger;
                this.cargando = true;
            } else {
                this.respuesta = this.success;
                this.cargando = true;
             }
         }));
    }

    cancelarCerrar() {
        this.dismiss();
    }

}

const name = 'confirmarPostulacion';

// create a module
export default angular.module(name, [
    angularMeteor,
]).component(name, {
    templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
    controllerAs: name,
    controller: ConfirmarPostulacion,
    bindings: {
        datosvacante: '<',
        close: '&',
        dismiss: '&'
    }
});

/**
 * Created by hector on 23/12/16.
 */
import {Vacantes} from "../../../../../api/vacantes/collection.js";
import {Tiendas} from "../../../../../api/tiendas/collection";
import {name as DatosContacto} from "../../../agencia/datosContacto/datosContacto";
import {name as TabsDetalleVacante} from "../../../vacantes/tabsDetalleVacante/tabsDetalleVacante";
import {name as TiendaPostulacion} from "../../../vacantes/tiendaPostulacion/tiendaPostulacion";
import template from "./detalleSeleccionada.html";

class DetalleSeleccionada {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.agenciaid = '';

        this.nuevotitulo = 'Ponte en Contacto';
        this.vacanteId = $stateParams.vacanteId;
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('vacantes.detalle', ()=> [{_id: this.vacanteId}]);
        this.subscribe('vacantes.tiendas', ()=> [{vacanteId: this.vacanteId}]);

        this.helpers({
            vacante() {
                return Vacantes.findOne({
                    _id: this.vacanteId
                });
            },
            tienda(){
                return Tiendas.find({
                    _id: this.tiendaId
                });
            }
        });
    }

}

const name = 'detalleSeleccionada';

// Módulo
export default angular
    .module(name, [
        DatosContacto,
        TabsDetalleVacante,
        TiendaPostulacion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetalleSeleccionada
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.postulaciones.detalleseleccionada', {
            url: '/detalleseleccionada/:vacanteId/:tiendaId',
            template: '<detalle-seleccionada></detalle-seleccionada>'
        });
}

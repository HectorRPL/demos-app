/**
 * Created by Héctor on 28/02/2017.
 */
import {Vacantes} from "../../../../../api/vacantes/collection.js";
import {Tiendas} from "../../../../../api/tiendas/collection";
import {Counts} from "meteor/tmeasday:publish-counts";
import {name as TabsDetalleVacante} from "../../../vacantes/tabsDetalleVacante/tabsDetalleVacante";
import {name as TiendaPostulacion} from "../../../vacantes/tiendaPostulacion/tiendaPostulacion";
import template from "./detallePostProceso.html";

class DetallePostProceso {
    constructor($stateParams, $scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.nuevotitulo = 'Detalles de mi postulación';
        this.vacanteId = $stateParams.vacanteId;
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('vacantes.detalle', () => [{_id: this.vacanteId}]);
        this.subscribe('vacantes.tiendas', () => [{vacanteId: this.vacanteId}]);
        this.subscribe('vacantes.candidato.postulado', () => [{vacanteId: this.vacanteId}]);

        this.helpers({
            vacante() {
                return Vacantes.findOne({
                    _id: this.vacanteId
                });
            },
            tienda(){
                return Tiendas.find(
                    {
                        _id: this.tiendaId
                    }
                );
            },
            postulado(){
                const result = Counts.get(`count.vacante.candidato.postulado.${this.vacanteId}`);
                if (result > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        });
    }

}

const name = 'detallePostProceso';

// Módulo
export default angular
    .module(name, [
        TabsDetalleVacante,
        TiendaPostulacion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetallePostProceso
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.detallepostproceso', {
            url: '/detallepostproceso/:vacanteId/:tiendaId',
            template: '<detalle-post-proceso></detalle-post-proceso>'
        });
}

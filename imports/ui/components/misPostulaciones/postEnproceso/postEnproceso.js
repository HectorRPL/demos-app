/**
 * Created by jvltmtz on 25/08/16.
 */
import {Postulaciones} from "../../../../api/postulaciones/collection";
import {activarVistoXCandidato} from "../../../../api/postulaciones/methods.js";
import utilsPagination from "angular-utils-pagination";
import {name as DetallePostProceso} from "./detallePostProceso/detallePostProceso";
import template from "./postEnproceso.html";

class PostEnproceso {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.nuevotitulo = 'Postuaciones en Proceso';
        this.perPage = 3;
        this.subscribe('postulaciones.mis', ()=> [{estado: 1}]);
        this.helpers({
            misPostulaciones() {
                return Postulaciones.find({}, {
                    sort: {fechaPostulacion: -1}
                });
            }
        });
    }

    // Quita la alerta de 'nuevo' y envía al usuario a los detalles de la vacante
    // Acción: De la collection "Postulaciones" pone a la propiedad "postVistoCandidato" en "true"
    verMas(vacanteId, postulacionId, tiendaId) {
        const postulacion = {_id: postulacionId};
        activarVistoXCandidato.call(postulacion, this.$bindToContext((error, result) => {
            if (error) {
                this.respuesta = this.danger;
            } else {
                this.respuesta = this.success;
            }
        }));
        this.$state.go('app.vacantes.detallepostproceso', {vacanteId: vacanteId, tiendaId: tiendaId});
    }
}

const name = 'postEnproceso';

// Módulo
export default angular
    .module(name, [
        utilsPagination,
        DetallePostProceso
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: PostEnproceso
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.postulaciones.enproceso', {
            url: '/enproceso',
            template: '<post-enproceso></post-enproceso>',
        });
}

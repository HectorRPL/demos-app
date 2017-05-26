/**
 * Created by jvltmtz on 25/08/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import ngAnimate from "angular-animate";
import {Postulaciones} from "../../../../api/postulaciones/collection.js";
import {activarSelecVistoXCandidato} from "../../../../api/postulaciones/methods.js";
import {name as DetalleSeleccionada} from "./detalleSeleccionada/detalleSeleccionada";
import utilsPagination from "angular-utils-pagination";
import "./postSeleccionada.html";

class PostSeleccionada {

    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('postulaciones.mis', ()=> [{estado: 2}]);
        this.nuevotitulo = 'Mis Entrevistas';
        this.$state = $state;
        this.helpers({
            misPostulaciones() {
                return Postulaciones.find();
            }
        });
    }

    // Quita la alerta de 'nuevo' y envía al usuario a los detalles de la vacante
    verDetallesEntrevista(postulacion) {
        activarSelecVistoXCandidato.call({_id: postulacion._id}, this.$bindToContext((error, result)=> {
            if (error) {
                this.respuesta = this.danger;
            } else {
                this.respuesta = this.success;
            }
        }));
        this.$state.go('app.postulaciones.detalleseleccionada', {
            vacanteId: postulacion.vacanteId,
            tiendaId: postulacion.tiendaId
        });
    }

}

const name = 'postSeleccionada';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ngAnimate,
        DetalleSeleccionada,
        utilsPagination
    ])
    .component(name, {
        templateUrl: `imports/ui/components/misPostulaciones/${name}/${name}.html`,
        controllerAs: name,
        controller: PostSeleccionada
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.postulaciones.seleccionada', {
            url: '/seleccionada',
            template: '<post-seleccionada></post-seleccionada>',
        });
}

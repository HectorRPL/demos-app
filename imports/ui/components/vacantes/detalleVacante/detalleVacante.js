import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import "./detalleVacante.html";
import {Vacantes} from "../../../../api/vacantes/collection.js";
import {Tiendas} from "../../../../api/tiendas/collection";
import {Counts} from "meteor/tmeasday:publish-counts";
import {name as ConfirmarPostulacion} from "../confirmarPostulacion/confirmarPostulacion";
import {name as Alertas} from "../../comun/alertas/alertas";

class DetalleVacante {
    constructor($stateParams, $scope, $reactive, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);

        this.nuevotitulo = 'Detalles de la promoción';
        this.vacanteId = $stateParams.vacanteId;
        this.subscribe('vacantes.detalle', ()=> [{_id: this.vacanteId}]);
        this.subscribe('vacantes.tiendas', ()=> [{vacanteId: this.vacanteId}]);
        this.subscribe('vacantes.candidato.postulado', ()=> [{vacanteId: this.vacanteId}]);
        this.$uibModal = $uibModal;
        this.tipoMsj = 'warning';
        this.msj = '¡Lo sentimos pero esta vacante ya ha sido ocupada.!';


        this.helpers({
            vacante() {
                return Vacantes.findOne({_id: this.vacanteId});
            },
            tiendas(){
                return Tiendas.find({vacanteId: this.vacanteId});
            },
            postulado(){
                const result = Counts.get(`count.vacante.candidato.postulado.${this.vacanteId}`);
                if (result > 0) {
                    this.tipoMsj = 'success';
                    this.msj = '¡Felicitaciones ya te postulaste para esta vacante!.';
                    return true;
                } else {
                    return false;
                }
            }
        });
    }

    abrirConfirmacion(tienda, marca, cadenaDesc) {
        const vacanteId = this.vacanteId;
        if (Meteor.user() === null) {
            this.$state.go('^.detalle', {vacanteId: vacanteId});
        } else {
            let modalInstance = this.$uibModal.open({
                animation: true,
                controllerAs: '$ctrl',
                controller: ['$uibModalInstance', 'datosVacante', function ($uibModalInstance, datosVacante) {
                    this.datosVacante = datosVacante;
                    this.close = $uibModalInstance.close;
                    this.dismiss = $uibModalInstance.dismiss;
                }],
                template: '<confirmar-postulacion datosvacante="$ctrl.datosVacante" dismiss="$ctrl.dismiss()" close="$ctrl.close()"></confirmar-postulacion>',
                size: '',
                backdrop: false,
                resolve: {
                    datosVacante: function () {
                        return {
                            tienda: tienda,
                            vacanteId: vacanteId,
                            marca: marca,
                            cadenaDesc: cadenaDesc
                        };
                    }
                }
            });
        }
    }


}

const name = 'detalleVacante';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ConfirmarPostulacion,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: DetalleVacante
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.detalle', {
            url: '/detalle/:vacanteId',
            template: '<detalle-vacante></detalle-vacante>'
        });
}

/**
 * Created by hector on 23/12/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Vacantes} from "../../../../../api/vacantes/collection.js";
import {Tiendas} from '../../../../../api/tiendas/collection';
import {name as DatosContacto} from '../../../agencia/datosContacto/datosContacto';
import "./contactoAgencia.html";

class ContactoAgencia {
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
            tiendas(){
                return Tiendas.find({
                    _id: this.tiendaId
                });
            }
        });
    }

}

const name = 'contactoAgencia';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        DatosContacto
    ])
    .component(name, {
        templateUrl: `imports/ui/components/misPostulaciones/postSeleccionada/${name}/${name}.html`,
        controllerAs: name,
        controller: ContactoAgencia
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('demos.postulaciones.contactoAgencia', {
            url: '/contactoAgencia/:vacanteId/:tiendaId',
            template: '<contacto-agencia></contacto-agencia>',
            resolve: {
                currentUser($q) {
                    if (Meteor.user() === null) {
                        return $q.reject('AUTH_REQUIRED');
                    } else {
                        return $q.resolve();
                    }
                }
            }
        });
}

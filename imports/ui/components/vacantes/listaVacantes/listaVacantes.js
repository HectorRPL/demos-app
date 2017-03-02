import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import utilsPagination from "angular-utils-pagination";
import {Counts} from "meteor/tmeasday:publish-counts";
import {Meteor} from 'meteor/meteor';
import {Vacantes} from "../../../../api/vacantes/collection.js";
import {name as DetalleVacante} from "../detalleVacante/detalleVacante";
import {name as VacantesBusqueda} from "../vacantesOrdenar/vacantesOrdenar";
import {name as EstoyPostulado} from "../estoyPostulado/estoyPostulado";
import {name as VacanteNueva} from "./vacanteNueva/vacanteNueva";
import "./listaVacantes.html";

class ListaVacantes {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.nuevotitulo = 'Vacantes Disponibles';
        this.perPage = 6;
        this.page = 1;
        this.puestoId = '';
        this.sort = {
            fechaCreacion: 1
        };
        this.subscribe('vacantes.publicadas', ()=>[{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage)
        }
        ]);
        this.helpers({
            vacantes() {
                return Vacantes.find({});
            },
            vacantesCount() {
                return Counts.get('numVacantes');
            }
        });

    }

    pageChanged(newPage) {
        this.page = newPage;
    }

    busqueda(sort) {
        this.sort = sort;
    }

}

const name = 'listaVacantes';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        DetalleVacante,
        utilsPagination,
        VacantesBusqueda,
        EstoyPostulado,
        VacanteNueva
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaVacantes
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.vacantes.lista', {
            url: '/lista',
            template: '<lista-vacantes></lista-vacantes>'
        });
}

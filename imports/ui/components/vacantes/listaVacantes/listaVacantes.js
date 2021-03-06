import utilsPagination from "angular-utils-pagination";
import {Counts} from "meteor/tmeasday:publish-counts";
import {Vacantes} from "../../../../api/vacantes/collection.js";
import {name as DetalleVacante} from "../detalleVacante/detalleVacante";
import {name as VacantesBusqueda} from "../vacantesOrdenar/vacantesOrdenar";
import {name as EstoyPostulado} from "../estoyPostulado/estoyPostulado";
import {name as VacanteNueva} from "./vacanteNueva/vacanteNueva";
import {actualizarEstadoReg} from "../../../../api/bitacoraLogin/methods";
import template from "./listaVacantes.html";

class ListaVacantes {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.actulizarEstado($state.current.name);
        this.nuevotitulo = 'Vacantes Disponibles';
        this.perPage = 6;
        this.page = 1;
        this.puestoId = '';
        this.subscribe('vacantes.publicadas', ()=>[{
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage)
        }
        ]);
        this.helpers({
            vacantes() {
                return Vacantes.find({}, {
                    sort: {fechaCreacion: -1}
                });
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

    actulizarEstado(nombreEstado) {
        actualizarEstadoReg.call({estado: nombreEstado}, this.$bindToContext((err) => {

        }));
    }

}

const name = 'listaVacantes';

// Módulo
export default angular
    .module(name, [
        DetalleVacante,
        utilsPagination,
        VacantesBusqueda,
        EstoyPostulado,
        VacanteNueva
    ])
    .component(name, {
        template,
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

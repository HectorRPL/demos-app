import {Session} from "meteor/session";
import {Habilidades} from "../../../../../api/catalogos/habilidades/collection.js";
import template from "./checkboxHabilidades.html";

class CheckboxHabilidades {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('habilidades');

        this.habPerfil = [];
        this.habSeleccionadas = [];
        this.otrahabilidad = '';

        this.otra = {
            'habilidad': 'Otra',
            '_id': 'Otra',
            'activo': false
        };
        this.helpers({
            datosHabilidades() {
                return Habilidades.find();
            }
        });
        this.habPerfil = Session.get('listadoHabilidades') || [];

    }

    agregarOEliminar(habilidad) {
        if (habilidad.activo === true) {
            this.habSeleccionadas.push(habilidad._id);
        } else if (habilidad.activo === false) {
            var index = this.habSeleccionadas.indexOf(habilidad._id);
            this.habSeleccionadas.splice(index, 1);
        }
        this.listado = this.habSeleccionadas.slice(0, this.habSeleccionadas.length);
    }

    habilitarCheck(habilidad) {
        let resultado = this.habPerfil.indexOf(habilidad._id);
        if (resultado > -1) {
            habilidad.activo = true;
        } else {
            habilidad.activo = false;
        }
    }
}

const name = 'checkboxHabilidades';
// create a module

export default angular
    .module(name, [ ])
    .component(name, {
        template,
        controllerAs: name,
        bindings: {
            listado: '=',
            otrahabilidad: '='
        },
        controller: CheckboxHabilidades
    });

import angular from "angular";
import angularMeteor from "angular-meteor";
import {Session} from "meteor/session";
import {Habilidades} from "../../../../../api/catalogos/habilidades/collection.js";
import "./checkboxHabilidades.html";

class CheckboxHabilidades {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('habilidades');

        this.expPerfil = [];
        this.expSeleccionadas = [];
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
        this.expPerfil = Session.get('listadoHabilidades') || [];

    }

    agregarOEliminar(habilidad) {
        if (habilidad.activo === true) {
            this.expSeleccionadas.push(habilidad._id);
        } else if (habilidad.activo === false) {
            var index = this.expSeleccionadas.indexOf(habilidad._id);
            this.expSeleccionadas.splice(index, 1);
        }
        this.listado = this.expSeleccionadas.slice(0, this.expSeleccionadas.length);
    }

    habilitarCheck(habilidad) {
        let resultado = this.expPerfil.indexOf(habilidad._id);
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
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/comun/checkBox/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            listado: '=',
            otrahabilidad: '='
        },
        controller: CheckboxHabilidades
    });

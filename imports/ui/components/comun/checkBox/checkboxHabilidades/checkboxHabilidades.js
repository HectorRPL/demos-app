import angular from "angular";
import angularMeteor from "angular-meteor";
import { Session } from 'meteor/session';
import {Habilidades} from "../../../../../api/habilidades/collection.js";
import "./checkboxHabilidades.html";

class CheckboxHabilidades {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('habilidades');

        this.listado = [];
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

        this.listado = Session.get('listadoHabilidades');

    }

    agregarOEliminar(habilidad) {
        if (habilidad.activo === true) {
            this.listado.push(habilidad._id);
        } else if (habilidad.activo === false) {
            var index = this.listado.indexOf(habilidad._id);
            this.listado.splice(index, 1);
        }
    }

    habilitarCheck(habilidad) {
        let resultado = this.listado.indexOf(habilidad._id);
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

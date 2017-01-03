import angular from "angular";
import angularMeteor from "angular-meteor";
import { Session } from 'meteor/session';
import {Experiencias} from "../../../../../api/experiencias/collection.js";
import "./checkboxExperiencias.html";

class CheckboxExperiencias {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('experiencias');

        this.listado = [];
        this.otraexperiencia = '';

        this.otra = {
            'experiencia': 'Otra',
            '_id': 'Otra',
            'activo': false
        };
        this.helpers({
            datosExperiencias() {
                return Experiencias.find();
            }
        });

        this.listado = Session.get('listadoExperiencias');

    }

    agregarOEliminar(experiencia) {
        if (experiencia.activo === true) {
            this.listado.push(experiencia._id);
        } else if (experiencia.activo === false) {
            var index = this.listado.indexOf(experiencia._id);
            this.listado.splice(index, 1);
        }
        var setValores = new Set(this.listado);
        this.listado = Array.from(setValores);
    }

    habilitarCheck(experiencia) {
        let resultado = this.listado.indexOf(experiencia._id);
        if (resultado > -1) {
            experiencia.activo = true;
        } else {
            experiencia.activo = false;
        }
    }
}

const name = 'checkboxExperiencias';
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
            otraexperiencia: '='
        },
        controller: CheckboxExperiencias
    });

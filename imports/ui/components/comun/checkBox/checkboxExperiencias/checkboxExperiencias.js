import angular from "angular";
import angularMeteor from "angular-meteor";
import {Session} from "meteor/session";
import {Experiencias} from "../../../../../api/catalogos/experiencias/collection.js";
import "./checkboxExperiencias.html";

class CheckboxExperiencias {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('experiencias');

        this.expPerfil = [];
        this.expSeleccionadas = [];
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

        this.expPerfil = Session.get('listadoExperiencias') || [];

    }

    agregarOEliminar(experiencia) {
        if (experiencia.activo === true) {
            this.expSeleccionadas.push(experiencia._id);
        } else if (experiencia.activo === false) {
            var index = this.listado.indexOf(experiencia._id);
            this.expSeleccionadas.splice(index, 1);
        }
        this.listado = this.expSeleccionadas.slice(0, this.expSeleccionadas.length);
    }

    habilitarCheck(experiencia) {
        let resultado = -1;
        resultado = this.expPerfil.indexOf(experiencia._id);
        if (resultado > -1) {
            this.expSeleccionadas.push(experiencia._id);
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

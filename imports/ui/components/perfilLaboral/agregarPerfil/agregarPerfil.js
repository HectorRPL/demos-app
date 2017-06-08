import {Session} from "meteor/session";
import {crearPerfil} from "../../../../api/perfiles/methods.js";
import {name as CheckboxHabilidades} from "../../comun/checkBox/checkboxHabilidades/checkboxHabilidades";
import {name as CheckboxExperiencias} from "../../comun/checkBox/checkboxExperiencias/checkboxExperiencias";
import {name as ElegirPuesto} from "../../comun/selects/elegirPuesto/elegirPuesto";
import {name as ElegirEscuela} from "../../comun/selects/elegirEscuela/elegirEscuela";
import {name as ElegirTalla} from "../../comun/selects/elegirTalla/elegirTalla";
import {name as ElegirEstatura} from "../../comun/inputs/elegirEstatura/elegirEstatura";
import {name as Alertas} from "../../comun/alertas/alertas";
import template from "./agregarPerfil.html";

class AgregarPerfil {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);

        this.cargando = false;
        this.$state = $state;
        this.perfil = {};

        Session.setPersistent("listadoExperiencias", []);
        Session.setPersistent("listadoHabilidades", []);
    }

    guardar() {
        this.cargando = true;
        crearPerfil.call(this.perfil, this.$bindToContext((err) => {
            if (err) {
                console.log(err);
                this.msj = ' No se pudieron guardar los datos. ' + err;
                this.tipoMsj = 'danger';
                this.cargando = false;
            } else {
                this.$state.go('app.vacantes.lista');
            }
        }));
    }
}

const name = 'agregarPerfil';

// create a module
export default angular
    .module(name, [
        CheckboxHabilidades,
        CheckboxExperiencias,
        ElegirPuesto,
        ElegirEscuela,
        ElegirTalla,
        ElegirEstatura,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarPerfil
    });

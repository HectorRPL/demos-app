import angular from "angular";
import angularMeteor from "angular-meteor";
import { Session } from 'meteor/session';
import uiRouter from "angular-ui-router";
import {name as ElegirEstatura} from "../../comun/inputs/elegirEstatura/elegirEstatura";
import {name as ElegirPuesto} from "../../comun/selects/elegirPuesto/elegirPuesto";
import {name as ElegirTalla} from "../../comun/selects/elegirTalla/elegirTalla";
import {name as ElegirEscuela} from "../../comun/selects/elegirEscuela/elegirEscuela";
import {actualizaPerfil} from "../../../../api/perfiles/methods.js";
import "./actualizarPerfil.html";

class ActualizarPerfil {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.cargando = true;

        this.respuesta = {
            mostrar: false,
            mensaje: '',
            tipo: ''
        };

    }

    $onChanges() {
        if (this.perfil) {
            Session.setPersistent("listadoHabilidades", this.perfil.habilidades.listado);
            Session.setPersistent("listadoExperiencias", this.perfil.experiencias.listado);
        }
    }

    actualizar() {
        this.cargando = false;
        actualizaPerfil.call(this.perfil, this.$bindToContext((err) => {
            this.respuesta.mostrar = true;
            if (err) {
                this.respuesta.mensaje = ' No se pudieron realizar los cambios. ' + err;
                this.respuesta.tipo = 'danger';
                this.cargando = true;
            } else {
                this.respuesta.mensaje = ' Los cambios se guardaron correctamente.';
                this.respuesta.tipo = 'success';
                this.cargando = true;
            }
        }));
    }

}

const name = 'actualizarPerfil';

// Módulo
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        ElegirEstatura,
        ElegirPuesto,
        ElegirTalla,
        ElegirEscuela
    ])
    .component(name, {
        templateUrl: `imports/ui/components/perfilLaboral/${name}/${name}.html`,
        controllerAs: name,
        controller: ActualizarPerfil,
        bindings: {
            perfil: '<',
            id: '<'
        }
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('demos.actualizarPerfil', {
            url: '/actualizarPerfil',
            template: '<actualizar-registroPerfil></actualizar-registroPerfil>'
        });
}

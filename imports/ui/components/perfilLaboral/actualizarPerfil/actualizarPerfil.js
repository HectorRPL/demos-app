import {Session} from "meteor/session";
import {name as ElegirEstatura} from "../../comun/inputs/elegirEstatura/elegirEstatura";
import {name as ElegirPuesto} from "../../comun/selects/elegirPuesto/elegirPuesto";
import {name as ElegirTalla} from "../../comun/selects/elegirTalla/elegirTalla";
import {name as ElegirEscuela} from "../../comun/selects/elegirEscuela/elegirEscuela";
import {name as Alertas} from "../../comun/alertas/alertas";
import {actualizaPerfil} from "../../../../api/perfiles/methods.js";
import template from "./actualizarPerfil.html";

class ActualizarPerfil {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('experiencias');
        this.cargando = false;
        this.helpers({
            expPerfil(){
                if(this.getReactively('listadoexp')){
                    Session.setPersistent("listadoExperiencias", this.getReactively('listadoexp'));
                }
            },
            habPerfil(){
                if(this.getReactively('listadohab')){
                    Session.setPersistent("listadoHabilidades", this.getReactively('listadohab'));
                }
            }
        })

    }

    actualizar() {
        this.cargando = true;
        this.tipoMsj = '';
        actualizaPerfil.call(this.perfil, this.$bindToContext((err) => {
            if (err) {
                this.msj = ' No se pudieron realizar los cambios. ' + err;
                this.tipoMsj = 'danger';
            } else {
                this.msj = ' Los cambios se guardaron correctamente.';
                this.tipoMsj = 'success';
            }
            this.cargando = false;
        }));
    }

}

const name = 'actualizarPerfil';

// Módulo
export default angular
    .module(name, [
        ElegirEstatura,
        ElegirPuesto,
        ElegirTalla,
        ElegirEscuela,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: ActualizarPerfil,
        bindings: {
            perfil: '<',
            id: '<',
            listadoexp: '<',
            listadohab: '<'
        }
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('app.actualizarPerfil', {
            url: '/actualizarPerfil',
            template: '<actualizar-registroPerfil></actualizar-registroPerfil>'
        });
}

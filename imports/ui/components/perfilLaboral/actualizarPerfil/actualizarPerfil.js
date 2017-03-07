import angular from "angular";
import angularMeteor from "angular-meteor";
import {Session} from "meteor/session";
import uiRouter from "angular-ui-router";
import {name as ElegirEstatura} from "../../comun/inputs/elegirEstatura/elegirEstatura";
import {name as ElegirPuesto} from "../../comun/selects/elegirPuesto/elegirPuesto";
import {name as ElegirTalla} from "../../comun/selects/elegirTalla/elegirTalla";
import {name as ElegirEscuela} from "../../comun/selects/elegirEscuela/elegirEscuela";
import {name as Alertas} from "../../comun/alertas/alertas";
import {actualizaPerfil} from "../../../../api/perfiles/methods.js";
import "./actualizarPerfil.html";

class ActualizarPerfil {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('experiencias');
        this.cargando = true;
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
        this.cargando = false;
        this.tipoMsj = '';
        actualizaPerfil.call(this.perfil, this.$bindToContext((err) => {
            if (err) {
                this.msj = ' No se pudieron realizar los cambios. ' + err;
                this.tipoMsj = 'danger';
                this.cargando = true;
            } else {
                this.msj = ' Los cambios se guardaron correctamente.';
                this.tipoMsj = 'success';
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
        ElegirEscuela,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/perfilLaboral/${name}/${name}.html`,
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

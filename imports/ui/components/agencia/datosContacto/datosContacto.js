/**
 * Created by hector on 23/12/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {Agencias} from "../../../../api/agencias/collection";
import {Direcciones} from "../../../../api/direcciones/collection";
import template from "./datosContacto.html";

class DatosContacto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('agencias.contacto', ()=> [{_id: this.getReactively('agenciaid')}]);
        this.subscribe('direcciones.agencia', ()=> [{propietario: this.getReactively('agenciaid')}]);

        this.helpers({
            direccionAgencia() {
                return Direcciones.findOne({
                    propietario: this.getReactively('agenciaid')
                });
            },
            datosAgencia() {
                return Agencias.findOne({
                    _id: this.getReactively('agenciaid')
                });
            }
        });
    }
}

const name = 'datosContacto';

export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: DatosContacto,
        bindings: {
            agenciaid: '<'
        }
    });
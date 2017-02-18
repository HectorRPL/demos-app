/**
 * Created by hector on 23/12/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import {Agencias} from "../../../../api/agencias/collection";
import {Direcciones} from "../../../../api/direcciones/collection";
import "./datosContacto.html";

class DatosContacto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('agencias.contacto', ()=> [{_id: this.getReactively('agenciaid')}]);
        this.subscribe('direcciones.agencia', ()=> [{propietario: this.getReactively('agenciaid')}]);

        this.helpers({
            direccionAgencia() {
                // console.log(this.agenciaid);
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
        templateUrl: `imports/ui/components/agencia/${name}/${name}.html`,
        controllerAs: name,
        controller: DatosContacto,
        bindings: {
            agenciaid: '<'
        }
    });
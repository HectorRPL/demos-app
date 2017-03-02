/**
 * Created by jvltmtz on 15/08/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as Alertas} from '../../comun/alertas/alertas';
import './modalRegistroVacante.html';

class ModalRegistroVacante {
    constructor($scope, $reactive, $state) {
        'ngInject';

        $reactive(this).attach($scope);
        this.$state = $state;
        this.tipoMsj = 'warning';
        this.msj = 'Para poder ver los detalles y postularte, necesitas registrarte.'

    }

    registrarme() {
        this.close({result: true});
        this.$state.go('demos.registro');
    }

    cancelar() {
        this.dismiss({razon: 'No quiere resgistrarse.'});
    }


}

const name = 'modalRegistroVacante';
// create a module

export default angular
    .module(name, [
        angularMeteor,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/vacantes/${name}/${name}.html`,
        controllerAs: name,
        controller: ModalRegistroVacante,
        bindings: {
            close: '&',
            dismiss: '&'
        }
    });

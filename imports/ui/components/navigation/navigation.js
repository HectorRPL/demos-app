import angular from "angular";
import angularMeteor from "angular-meteor";
import {Candidatos} from "../../../api/candidatos/collection";
import {name as NumNuevasSelecciones} from "../counts/numNuevasSelecciones/numNuevasSelecciones";
import {name as NumPostulacionesVistas} from "../counts/numPostulacionesVistas/numPostulacionesVistas";
import "./navigation.html";

class Navigation {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.subscribe('candidatos.logeado');
        this.helpers({
            candidatoLoggeado() {
                return Candidatos.findOne();
            }
        });

        this.menusSidebar = [
            {titulo: 'Mi Cuenta', stateUiSref: 'app.miCuenta', fontAwesome: 'fa fa-user'},
        ];
    }
}

const name = 'navigation';
// create a module

export default angular
    .module(name, [
        angularMeteor,
        NumNuevasSelecciones,
        NumPostulacionesVistas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Navigation,
    });

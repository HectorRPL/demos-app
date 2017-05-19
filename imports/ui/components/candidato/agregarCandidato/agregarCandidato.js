/**
 * Created by jvltmtz on 26/09/16.
 */
import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import angularMessages from "angular-messages";
import {Accounts} from "meteor/accounts-base";
import {name as ElegirAnio} from "../../comun/selects/elegirFechaNacimiento/elegirAnio/elegirAnio";
import {name as ElegirMes} from "../../comun/selects/elegirFechaNacimiento/elegirMes/elegirMes";
import {name as ElegirDia} from "../../comun/selects/elegirFechaNacimiento/elegirDia/elegirDia";
import {name as CodigoPaisCelular} from "../../comun/inputs/codigoPaisCelular/codigoPaisCelular";
import {name as NumCelular} from "../../comun/inputs/numCelular/numCelular";
import {name as Alertas} from "../../comun/alertas/alertas";
import "./agregarCandidato.html";


class AgregarCandidato {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.cargando = false;
        this.paisLada = '52';
        this.pais = '';
        this.credentials = {
            email: '',
            password: '',
            username: '',
            profile: {}
        };
    }

    crearUsuario() {
        this.cargando = true;
        this.credentials.email = this.credentials.email.toLowerCase();
        this.credentials.username = this.credentials.email;
        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.tipoMsj='danger';
                    if (err.error === 403) {
                        this.msj = `El correo ${this.credentials.email} ya se encuentra registrado`;
                        this.cargando = false;
                    } else {
                        this.msj  = err.reason;
                        this.cargando = false;
                    }
                } else {
                    this.$state.go('demos.registro.confirmacion');
                }
            })
        );
    }
}

const name = 'agregarCandidato';

// create a module
export default angular
    .module(name, [
        angularMeteor,
        uiRouter,
        angularMessages,
        ElegirAnio,
        ElegirMes,
        ElegirDia,
        CodigoPaisCelular,
        NumCelular,
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/candidato/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarCandidato
    });

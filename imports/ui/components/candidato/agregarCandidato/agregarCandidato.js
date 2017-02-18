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
import "./agregarCandidato.html";


class AgregarCandidato {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.cargando = true;
        this.paisLada = '52';
        this.pais = '';
        this.credentials = {
            email: '',
            password: '',
            username: '',
            profile: {}
        };

        this.error = '';
    }

    crearUsuario() {
        this.error = '';
        this.credentials.email = this.credentials.email.toLowerCase();
        this.credentials.username = this.credentials.email;
        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                    if (this.error.error === 403) {
                        this.error.mensaje = `El correo ${this.credentials.email} ya se encuentra registrado`;
                    } else {
                        this.error.mensaje = err.reason;
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
        NumCelular
    ])
    .component(name, {
        templateUrl: `imports/ui/components/candidato/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarCandidato
    });

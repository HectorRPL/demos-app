/**
 * Created by jvltmtz on 26/09/16.
 */
import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import angularMessages from 'angular-messages';
import {Accounts} from 'meteor/accounts-base';
import {name as ElegirAnio} from '../../comun/selects/elegirFechaNacimiento/elegirAnio/elegirAnio';
import {name as ElegirMes} from '../../comun/selects/elegirFechaNacimiento/elegirMes/elegirMes';
import {name as ElegirDia} from '../../comun/selects/elegirFechaNacimiento/elegirDia/elegirDia';

import './agregarCandidato.html';


class AgregarCandidato {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.cargando = true;

        this.credentials = {
            email: '',
            password: '',
            username: '',
            profile: {}
        };

        this.error = '';
    }

    crearUsuario() {
        this.cargando = false;
        this.error = '';
        this.credentials.email = this.credentials.email.toLowerCase();
        this.credentials.username = this.credentials.email;
        Accounts.createUser(this.credentials,
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                    if (this.error.error === 403) {
                        this.error.mensaje = `El correo ${this.credentials.email} ya se encuentra registrado`;
                        console.log(this.error);
                        this.cargando = true;
                    }

                } else {
                    this.$state.go('inicio.registro.direccion');
                    this.cargando = true;
                }
            })
        );
    }
}

const name = 'agregarCandidato';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
    angularMessages,
    ElegirAnio,
    ElegirMes,
    ElegirDia
]).component(name, {
    templateUrl: `imports/ui/components/candidato/${name}/${name}.html`,
    controllerAs: name,
    controller: AgregarCandidato
});

/**
 * Created by jvltmtz on 26/09/16.
 */
import {Accounts} from "meteor/accounts-base";
import {name as ElegirAnio} from "../../comun/selects/elegirFechaNacimiento/elegirAnio/elegirAnio";
import {name as ElegirMes} from "../../comun/selects/elegirFechaNacimiento/elegirMes/elegirMes";
import {name as ElegirDia} from "../../comun/selects/elegirFechaNacimiento/elegirDia/elegirDia";
import {name as NumCelular} from "../../comun/inputs/numCelular/numCelular";
import {name as Alertas} from "../../comun/alertas/alertas";
import template from "./agregarCandidato.html";
import {Paises} from "../../../../api/catalogos/paises/collection";


class AgregarCandidato {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.cargando = false;
        this.subscribe('paises', ()=>[{_id: 'MX'}]);
        this.credentials = {
            email: '',
            password: '',
            username: '',
            profile: {}
        };
        this.helpers({
            pais(){
                return Paises.findOne({_id: 'MX'});
            }
        })
    }

    crearUsuario() {
        this.cargando = true;
        this.credentials.email = this.credentials.email.toLowerCase();
        this.credentials.username = this.credentials.email;
        this.credentials.profile.paisLada = this.pais.telefono;
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
        ElegirAnio,
        ElegirMes,
        ElegirDia,
        NumCelular,
        Alertas
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarCandidato
    });

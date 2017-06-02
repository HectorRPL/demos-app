/**
 * Created by jvltmtz on 2/06/17.
 */
import {obtenerEstadoReg} from "../../../api/bitacoraLogin/methods";


export class Login {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Ingresa a Demostradoras';
        this.cargando = false;

        this.credentials = {
            email: '',
            password: ''
        };

    }

    login() {
        this.tipoMsj ='';
        this.cargando = true;
        Meteor.loginWithPassword(this.credentials.email.toLowerCase(), this.credentials.password,
            this.$bindToContext((err) => {
                if (err) {
                    this.msj = 'Usuario y/o Contraseña incorrectos';
                    this.tipoMsj ='danger';
                    this.cargando = false;
                } else {
                    obtenerEstadoReg.call({}, this.$bindToContext((err, result)=> {
                        if(err){
                            this.$state.go('app.vacantes.lista');
                        }else{
                            this.$state.go(result);
                        }
                    }));
                }
            })
        );
    }
}


import {Meteor} from "meteor/meteor";
import {obtenerEstadoReg} from "../../../api/bitacoraLogin/methods";
import template from "./facebook.html";

class Facebook {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;

        $reactive(this).attach($scope, $state);

        this.error = '';
    }

    login() {
        this.error = '';
        Meteor.loginWithFacebook({
            requestPermissions: ['user_friends', 'public_profile', 'email']
        }, (err) => {
            if (err) {
                this.error = err;
                console.log('No se pudo crear el usuario, por el siguiente motivo: \b', err);
            } else {
                obtenerEstadoReg.call({}, this.$bindToContext((err, result)=> {
                    console.log(result);
                    this.$state.go(result);
                }));
            }
        });
    }
}

const name = 'facebook';

// create a module
export default angular
    .module(name, [
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Facebook
    });

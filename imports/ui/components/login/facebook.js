import angular from "angular";
import angularMeteor from "angular-meteor";
import uiRouter from "angular-ui-router";
import {Meteor} from "meteor/meteor";
import "./facebook.html";

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
                this.$state.go('inicio.registro.facebook');
            }
        });
    }
}

const name = 'facebook';

// create a module
export default angular.module(name, [
    angularMeteor,
    uiRouter,
]).component(name, {
    templateUrl: `imports/ui/components/login/${name}.html`,
    controllerAs: name,
    controller: Facebook
});

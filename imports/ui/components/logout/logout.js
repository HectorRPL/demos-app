import angular from "angular";
import angularMeteor from "angular-meteor";
import {Meteor} from "meteor/meteor";
import "./logout.html";

class Logout {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
        this.error = '';

    }

    salir() {
        this.error = '';
        Meteor.logout(
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                } else {
                    this.$state.go('inicio.login');
                }
            })
        );
    }
}

const name = 'logout';
// create a module

export default angular.module(name, [
    angularMeteor
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: Logout
});

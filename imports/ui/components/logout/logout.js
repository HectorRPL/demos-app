import {Meteor} from "meteor/meteor";
import template from "./logout.html";

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
                    this.$state.go('demos.login');
                }
            })
        );
    }
}

const name = 'logout';
// create a module

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: Logout
    });

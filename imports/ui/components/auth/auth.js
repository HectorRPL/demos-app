import angular from "angular";
import angularMeteor from "angular-meteor";
import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {name as DisplayNameFilter} from "../../filters/displayNameFilter";

class Auth {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            isLoggedIn() {
                return !!Meteor.userId();
            },

            currentUser() {
                return Meteor.user();
            }
        });

    }

    logout() {
        Accounts.logout();
    }

}


// create a module

export default angular
    .module(name, [
        angularMeteor,
        DisplayNameFilter
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: Auth
    });

import angular from "angular";
import angularMeteor from "angular-meteor";
import {Accounts} from "meteor/accounts-base";
import "./recuperar.html";
class Recuperar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.email = '';
        this.answer = {
            show: false,
            message: '',
            fontawesome: ''
        };
    }

    send() {
        Accounts.forgotPassword({email: this.email}, this.$bindToContext((err) => {
                this.answer.show = true;
                if (err) {
                    this.answer.message = 'Error';
                    console.log('This is the error:', err);
                } else {
                    this.answer.message = 'Success';
                    console.log('Success, to send email to backend, I think');
                }
            })
        );
    }
}

const name = 'recuperar';

// create a module
export default angular
    .module(name, [
        angularMeteor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/${name}/${name}.html`,
        controllerAs: name,
        controller: Recuperar
    })
    .config(config);

function config($stateProvider) {
    'ngInject';

    $stateProvider
        .state('demos.recuperar', {
            url: '/recuperar',
            template: '<recuperar></recuperar>'
        });
}

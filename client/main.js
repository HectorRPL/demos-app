import angular from 'angular';
import {Meteor} from 'meteor/meteor';
import {name as Inicio} from '../imports/ui/components/inicio/inicio';

function onReady() {
    angular.bootstrap(document, [
        Inicio
    ], {
        strictDi: true
    });
}

if (Meteor.isCordova) {
    angular.element(document).on('deviceready', onReady);
} else {
    angular.element(document).ready(onReady);
}

/*const name = 'main';
 // create a module

 export default angular.module('demostradorasApp', [
 Inicio
 ]);*/

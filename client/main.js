import angular from "angular";
import {Meteor} from "meteor/meteor";
import {name as Demos} from "../imports/ui/components/demos/demos";

function onReady() {
    angular.bootstrap(document, [
        Demos
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
 Demos
 ]);*/

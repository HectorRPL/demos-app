import {Meteor} from "meteor/meteor";
import {Meses} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('meses', function () {
        const selector = {};
        return Meses.find(selector);
    });
}

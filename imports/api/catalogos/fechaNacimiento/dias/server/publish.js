import {Meteor} from "meteor/meteor";
import {Dias} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('dias', function () {
        const selector = {};
        return Dias.find(selector);
    });
}

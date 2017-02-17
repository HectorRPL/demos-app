import {Meteor} from "meteor/meteor";
import {Anios} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('anios', function () {
        return Anios.find();
    });
}

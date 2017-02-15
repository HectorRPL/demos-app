/**
 * Created by jvltmtz on 10/01/17.
 */
import {Meteor} from "meteor/meteor";
import {Paises} from "../collection";

if (Meteor.isServer) {
    Meteor.publish('paises', (paisId) => {
        return Paises.find(paisId);
    });
}
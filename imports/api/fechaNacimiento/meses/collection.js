import {Mongo} from "meteor/mongo";
export const Meses = new Mongo.Collection('meses');

Meses.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

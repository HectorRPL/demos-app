import {Mongo} from "meteor/mongo";
export const Anios = new Mongo.Collection('anios');

Anios.deny({
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
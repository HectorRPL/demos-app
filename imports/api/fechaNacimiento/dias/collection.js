import {Mongo} from "meteor/mongo";
export const Dias = new Mongo.Collection('dias');

Dias.deny({
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

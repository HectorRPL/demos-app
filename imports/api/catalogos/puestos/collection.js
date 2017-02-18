import {Mongo} from "meteor/mongo";
export const Puestos = new Mongo.Collection('puestos');

Puestos.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    },
});

Puestos.helpers({
    descripcion(){
        return `${this.ṕuesto}`;
    }
});
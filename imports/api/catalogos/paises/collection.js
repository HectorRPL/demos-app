/**
 * Created by jvltmtz on 10/01/17.
 */
import { Mongo } from 'meteor/mongo';
export const Paises = new Mongo.Collection('paises');

Paises.deny({
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

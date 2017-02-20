/**
 * Created by jvltmtz on 22/01/17.
 */
import {Mongo} from "meteor/mongo";
import codigosVerificacionUtils from "./codigosVerificacionUtils";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

const TIEMPO_EXPIRACION = (60000 * 10);

class CodigosVerificaionCollection extends Mongo.Collection {
    update(selector, modifier) {
        const result = super.update(selector, modifier);
        codigosVerificacionUtils.afterUpdateCodigoVerificacion(selector, modifier);
        return result;
    }

    remove(selector, callback) {
        const result = super.remove(selector, callback);
        codigosVerificacionUtils.afterRemoveCodigoVerificion(selector);
        return result;
    }
}
export const CodigosVerificaion = new CodigosVerificaionCollection('codigosVerificacion');

CodigosVerificaion.deny({
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

const Schema = {};

Schema.codigosVerificacion = new SimpleSchema({
    _id: {
        type: String,
        regEx: SimpleSchema.RegEx.Id
    },
    expiracion: {
        type: Date,
        autoValue: function () {
            let date = new Date(new Date().getTime() + TIEMPO_EXPIRACION);
            return date;
        }
    },
    codigo: {
        type: String,
        max: 4,
        min: 2,
        autoValue: function () {
            let length = 4;
            let output = '';
            while (length-- > 0) {
                output += Math.floor((Math.random() * 9) + 1);
            }
            return output;
        }
    }
});


CodigosVerificaion.attachSchema(Schema.codigosVerificacion);
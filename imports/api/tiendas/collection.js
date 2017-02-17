/**
 * Created by jvltmtz on 10/10/16.
 */

import {Mongo} from "meteor/mongo";
import {Cadenas} from '../catalogos/cadenas/collection';
import tiendasCounts from './tiendasCounts';

class TiendasCollection extends Mongo.Collection {
    update(selector, modifier) {
        const result = super.update(selector, modifier);
        tiendasCounts.afterUpdateTienda(selector, modifier);
        return result;
    }

}

export const Tiendas = new TiendasCollection('tiendas');

Tiendas.helpers({
    cadena(){
        return Cadenas.findOne({_id:this.cadenaId});
    }
});
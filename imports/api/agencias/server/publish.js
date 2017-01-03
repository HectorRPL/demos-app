/**
 * Created by Héctor on 23/12/2016.
 */
import {Meteor} from 'meteor/meteor';
import {Agencias} from '../collection';

if (Meteor.isServer) {
    Meteor.publish('agencias.contacto', (agenciaId) => {
        return Agencias.find(agenciaId);
    });
}
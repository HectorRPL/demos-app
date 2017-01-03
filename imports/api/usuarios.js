import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Candidatos} from './candidatos/collection'

if (Meteor.isServer) {
    Meteor.publish('usersData', function () {

        return Meteor.users.find({_id: this.userId}, {
            fields: {
                emails: 1,
                estado: 1
            }
        });
    });

    Accounts.onCreateUser((options, user) => {

        let candidato = {};

        if (user.services.facebook) {
            var datos = user.services.facebook || {};
            candidato.nombre = datos.first_name || '';
            candidato.apellidos = datos.last_name || '';
            candidato.sexo = datos.gender == 'male' ?
                'Hombre' : 'Mujer' || '';
            candidato.email = datos.email || '';
        } else {
            candidato = options.profile;
            candidato.email = user.emails[0].address || '';
        }
        candidato.propietario = user._id;
        user.estado = 'direccion';
        user.username = candidato.email;
        Candidatos.insert(candidato);

        return user;
    });
}

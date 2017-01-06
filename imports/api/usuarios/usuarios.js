import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Candidatos} from '../candidatos/collection'
import {BitacoraLogin} from '../bitacoraLogin/collection'
const LOGIN_METHOD = 'login';
const CREATE_USER_METHOD = 'createUser';

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
        user.username = candidato.email;
        Candidatos.insert(candidato);

        return user;
    });

    Accounts.onLogin((result)=> {
        let bitacoraLogin = {
            propietario: result.user._id,
            fechaLogin: new Date(),
            conexion: result.connection,
            estadoRegistro: 'inicio.registro.direccion',
            tipoLogin: result.type

        };
        if ('facebook' == result.type) {
            bitacoraLogin.estadoRegistro = 'inicio.registro.facebook';
            const bitacora = BitacoraLogin.findOne({propietario: result.user._id});
            if (bitacora) {
                BitacoraLogin.update({_id: bitacora._id}, {$set: {fechaLogin: new Date()}});
            } else {
                BitacoraLogin.insert(bitacoraLogin);
            }
        } else {
            if (CREATE_USER_METHOD === result.methodName) {
                BitacoraLogin.insert(bitacoraLogin);
            }
            if (LOGIN_METHOD === result.methodName) {
                BitacoraLogin.update({propietario: result.user._id}, {$set: {fechaLogin: new Date()}});
            }
        }



    });


}

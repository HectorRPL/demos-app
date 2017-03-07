import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {Candidatos} from "../candidatos/collection";
import {BitacoraLogin} from "../bitacoraLogin/collection";
import {CodigosVerificaion} from "../codigosVerificacion/collection";

const LOGIN_METHOD = 'login';
const CREATE_USER_METHOD = 'createUser';

if (Meteor.isServer) {

    Accounts.onCreateUser((options, user) => {
        let candidato = {};
        let servicePhone = {
            bcrypt: ''
        };
        user.phone = {number: '', verified: false};
        if (user.services.facebook) {
            let datos = user.services.facebook || {};
            candidato.nombre = datos.first_name || '';
            candidato.apellidos = datos.last_name || '';
            candidato.sexo = datos.gender == 'male' ?
                'Hombre' : 'Mujer' || '';
            if (datos.email) {
                candidato.email = datos.email;
                user.emails = [{
                    address: datos.email,
                    verified: true
                }];
                user.username = candidato.email;
            }
        } else if (user.services.password) {
            candidato = options.profile;
            servicePhone.bcrypt = user.services.password.bcrypt;
            user.phone.number = options.profile.celular;
            user.phone.paisLada = options.profile.paisLada;
        }
        user.services.phone = servicePhone;
        candidato.propietario = user._id;
        Candidatos.insert(candidato);

        return user;
    });


    Accounts.onLogin((result)=> {
        let bitacoraLogin = {
            propietario: result.user._id,
            fechaLogin: new Date(),
            conexion: result.connection,
            estadoRegistro: 'demos.registro.confirmacion',
            tipoLogin: result.type

        };
        if ('facebook' == result.type) {
            bitacoraLogin.estadoRegistro = 'demos.registro.facebook';
            const bitacora = BitacoraLogin.findOne({propietario: result.user._id});
            if (bitacora) {
                BitacoraLogin.update({_id: bitacora._id}, {$set: {fechaLogin: new Date()}});
            } else {
                BitacoraLogin.insert(bitacoraLogin);
            }
        } else {
            if (CREATE_USER_METHOD === result.methodName) {
                BitacoraLogin.insert(bitacoraLogin);
                CodigosVerificaion.insert({_id: result.user._id}, (err, resultId)=> {
                    if (resultId) {
                        const resCod = CodigosVerificaion.findOne({_id: resultId});
                        try {
                            TwilioSMS.enviarSMS(result.user._id, resCod.codigo);
                        } catch (e) {
                            console.log('Error al enviar el SMS ', e);
                        }
                    }
                });
            }
            if (LOGIN_METHOD === result.methodName) {
                BitacoraLogin.update({propietario: result.user._id}, {$set: {fechaLogin: new Date()}});
            }
        }


    });


}

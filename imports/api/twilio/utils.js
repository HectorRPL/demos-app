/**
 * Created by jvltmtz on 19/01/17.
 */
import {Meteor} from 'meteor/meteor';
import {CodigosVerificaion} from '../codigosVerificacion/collection';
import {Candidatos} from '../candidatos/collection';
import {Twilio} from 'meteor/mrt:twilio-meteor';
const TEL_MAS = '+';


TwilioSMS = {

    enviarSMS(userId, codigo){
        const user = Meteor.users.findOne({_id: userId});
        const msj = {
            to: TEL_MAS + user.phone.number,
            from: TEL_MAS + Meteor.settings.smsConfig.testFromSMS,
            body: `Bienvenido a Demotradoras con Experiencia, tu código de verificación es: ${codigo}`
        };
        console.log('Mensaje a enviar ', msj);
        let cliTwilio = Twilio(Meteor.settings.smsConfig.accountSid, Meteor.settings.smsConfig.authToke);

        let enviarSMS = Meteor.wrapAsync(cliTwilio.sendSms, cliTwilio);
        try {
            let result = enviarSMS(msj);
            return result
        } catch (e) {
            let mensaje = '';
            let reason = '';
            switch (e.code) {
                case 21211:
                case 21610:
                    mensaje = 'Numero de celular no valido.';
                    reason = 'numero no valido';
                    break;
                case 21612:
                case 21408:
                    mensaje = 'No se pudo enviar SMS al celular proporcionado.';
                    reason = 'error al enviar SMS';
                    break;
                case 21614:
                    mensaje = 'El celular proporcionado no puede recibir SMS.';
                    reason = 'celular no recive SMS';
                    break;
                default:
                    mensaje = 'No se pudo enviar SMS al celular proporcionado.';
                    reason = 'error al enviar SMS';
                    break;
            }
            throw  new Meteor.Error(403, mensaje, reason);
        }
    },

    verificarTiempoEnvio(userId){
        const codigoVer = CodigosVerificaion.findOne({_id: userId});
        let fechaHoy = new Date();
        if (fechaHoy < codigoVer.expiracion) {
            const min = Math.ceil(Math.abs((fechaHoy.getTime() - codigoVer.expiracion.getTime()) / 60000));
            throw new Meteor.Error(403, `Espere ${min}min. solcicitar otro codigo de confirmacion`, 'tiempo de envio espera');
        }
    },
    crearCodigoVerificacion(userId){
        const codigoVer = {
            _id: userId
        };
        CodigosVerificaion.insert(codigoVer, (err, resultId)=> {
            if (resultId) {
                const resCod = CodigosVerificaion.findOne({_id: resultId});
                try {
                    this.enviarSMS(result.user._id, resCod.codigo);
                } catch (e) {
                    console.log('Error al enviar el SMS ', e);
                }
            }
        });
    }
};

VerificarSMS = {
    verificarCodigo(codigo, userId){
        const codigoVer = CodigosVerificaion.findOne({_id: userId});
        if (codigo !== codigoVer.codigo) {
            throw new Meteor.Error(403, 'Código no valido', 'codigo no valido');
        } else {
            if (new Date() > codigoVer.expiracion) {
                throw new Meteor.Error(403, 'Codigo de verificacion expirado, solicita un nuevo codigo', 'codigo expirado');
            }
            Meteor.users.update({_id: userId}, {$set: {'phone.verified': true}});
        }
    }
};







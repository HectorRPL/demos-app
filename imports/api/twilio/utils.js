/**
 * Created by jvltmtz on 19/01/17.
 */
import {Meteor} from "meteor/meteor";
import {CodigosVerificaion} from "../codigosVerificacion/collection";
import {Twilio} from "meteor/mrt:twilio-meteor";
const TEL_MAS = '+';
let twilioConfig = {};

if (Meteor.isServer) {
    Meteor.startup(() => {
        twilioConfig = {
            from: '19543728561',
            testFrom: '15005550006',
            accountSid: 'ACbfbabd22a5d486bff3b92e219e93fd47',
            authToke: '2f93111372dc246eaead700ced362616',
            phoneVerificationMasterCode: '1q2W',
            forbidClientAccountCreation: false,
            verificationMaxRetries: 3
        }
    });
}

TwilioSMS = {

    enviarSMS(userId, codigo){
        const user = Meteor.users.findOne({_id: userId});
        const msj = {
            to: TEL_MAS + user.phone.number,
            from: TEL_MAS + twilioConfig.testFrom,
            body: `Bienvenido a Demotradoras con Experiencia, tu código de verificación es: ${codigo}`
        };
        console.log('Mensaje a enviar ', msj);
        let cliTwilio = Twilio(twilioConfig.accountSid, twilioConfig.authToke);

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
    }
};








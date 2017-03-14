import {Meteor} from "meteor/meteor";

Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://postmaster%40sandboxb82e8f80c2074fe2aa151f5c42a4aa20.mailgun.org:55ef05eb857e794d5435dab486ed6432@smtp.mailgun.org:587';
    if (Meteor.isServer && !Meteor.isCordova) {
        const facebookConfig = Meteor.settings.private.facebook;
        ServiceConfiguration.configurations.upsert({
            service: facebookConfig.service
        }, {
            $set: {
                appId: facebookConfig.appId,
                loginStyle: facebookConfig.loginStyle,
                secret: facebookConfig.secret
            }
        });
    }
});

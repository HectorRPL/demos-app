import {Meteor} from "meteor/meteor";

Meteor.startup(() => {
    process.env.MAIL_URL = 'smtp://postmaster%40yodemos.com:8c0970cbe121ddb68e32c5e727fabc9b@smtp.mailgun.org:587';
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

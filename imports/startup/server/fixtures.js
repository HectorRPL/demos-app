import {Meteor} from "meteor/meteor";

Meteor.startup(() => {

    if (Meteor.isServer) {
        /*const facebookConfig = Meteor.settings.private.facebook;
        ServiceConfiguration.configurations.upsert({
            service: facebookConfig.service
        }, {
            $set: {
                appId: facebookConfig.appId,
                loginStyle: facebookConfig.loginStyle,
                secret: facebookConfig.secret
            }
        });*/
    }
});

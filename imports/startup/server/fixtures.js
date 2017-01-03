 import { Meteor } from 'meteor/meteor';

 Meteor.startup(() => {

     if(Meteor.isServer){
         ServiceConfiguration.configurations.upsert({
             service: Meteor.settings.facebook.service
         }, {
             $set: {
                 appId: Meteor.settings.facebook.appId,
                 loginStyle: Meteor.settings.facebook.loginStyle,
                 secret: Meteor.settings.facebook.secret
             }
         });
     }
 });

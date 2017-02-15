/**
 * Created by jvltmtz on 9/01/17.
 */
if (Meteor.isServer) {
    Meteor.publish('datosUsuario', function () {

        return Meteor.users.find({_id: this.userId}, {
            fields: {
                emails: 1,
                phone: 1
            }
        });
    });
}
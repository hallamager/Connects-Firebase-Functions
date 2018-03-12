const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



exports.businessLiked = functions.database.ref('/businessesLiked/{bid}/{uid}').onWrite((event) => {

    const uid = event.params.uid;
    const bid = event.params.bid;




    console.log(`${uid} liked ${bid}`);

    return true;

});

exports.sendPushNotifcations = functions.database.ref('/businessesLiked/{bid}/{uid}').onWrite(event => {

    const payload = {

        notification: {

            title: 'New Message',
            body: 'Have a look',
            badge: '1',
            sound: 'default',

        }

    };
    return admin.database().ref('fcmToken').once('value').then(allToken => {
        if (allToken.val()) {
            const token = Object.keys(allToken.val());
            return admin.messaging().sendToDevice(token, payload).then(response => {

            });
        };
    });
});

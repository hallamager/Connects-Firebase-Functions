const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



exports.sendLikedNotification = functions.database.ref('/businessesLiked/{bid}/{uid}').onWrite((event) => {

    const uid = event.params.uid;
    const bid = event.params.bid;

    console.log(`${uid} liked ${bid}`);

    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin.database().ref(`/business/${bid}/FCM Token`).once('value');

    // Get liked profile
    const getLikedProfilePromise = admin.auth().getUser(uid);

    return Promise.all([getDeviceTokensPromise, getLikedProfilePromise]).then((results) => {
        const tokensSnapshot = results[0];
        const liker = results[1];

        // Check if there are any device tokens.
        if (!tokensSnapshot.hasChildren()) {
            return console.log('There are no notification tokens to send to.');
        }

        console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
        console.log('Fetched liker profile', liker);

        // Notification details
        const payload = {
            notification: {

                title: 'Someone liked your profile',
                body: `${liker.Username} is now following you.`,
                badge: '1',

            },

        };

        // Listing all tokens.
        const tokens = Object.keys(tokensSnapshot.val());

        // Send notifications to all tokens.
        return admin.messaging().sendToDevice(tokens, payload);

    }).then((response) => {
        // For each message check if there was an error.
        const tokensToRemove = [];
        response.results.forEach((results, index) => {
            const error = result.error;
            if (error) {
                console.error('Failure sending notification to', tokens[index], error);
                // Cleanup the tokens who are not registered anymore
                if (error.code === 'messaging/invalid-registration-token' || error.code === 'messaging/registration-token-not-valid') {
                    tokensToRemove.push(tokensSnapshot.ref.child(tokens[index]).remove());
                }
            }
        });
        return Promise.all(tokensToRemove)
    });

});





//exports.sendPushNotifcations = functions.database.ref('/businessesLiked/{bid}/{uid}').onWrite(event => {
//
//    const payload = {
//
//        notification: {
//
//            title: 'New Message',
//            body: 'Have a look',
//            badge: '1',
//            sound: 'default',
//
//        }
//
//    };
//    return admin.database().ref('/businessesLiked/{bid}').once('value').then(allToken => {
//        if (allToken.val()) {
//            const token = Object.keys(allToken.val());
//            return admin.messaging().sendToDevice(token, payload).then(response => {
//
//            });
//        };
//    });
//});

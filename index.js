const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.jobAppliedNotification = functions.database.ref('/jobsApplied/{bid}/{uid}').onWrite((event) => {

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

                body: 'Congratulations! Someone liked your profile',
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



exports.sendInviteResponseNotification = functions.database.ref('/organisedChats/{uid}/{bid}/Response').onUpdate((event) => {

    const uid = event.params.uid;
    const bid = event.params.bid;

    console.log(`${uid} responsed to ${bid} invite`);

    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin.database().ref(`/student/${uid}/FCM Token`).once('value');

    // Get liked profile
    const getLikedProfilePromise = admin.auth().getUser(bid);

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

                body: 'A student has responsed to your invite. Go have a look!',
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

                body: 'Congratulations! Someone liked your profile',
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

exports.sendQuestionsOneNotification = functions.database.ref('/studentResponses/{bid}/{uid}/Answer One').onCreate((event) => {

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

                body: 'A student has awnswered your first question, have a look.',
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

exports.sendQuestionsTwoNotification = functions.database.ref('/studentResponses/{bid}/{uid}/Answer Two').onCreate((event) => {

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

                body: 'A student has awnswered your second question, have a look.',
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

exports.sendQuestionsThreeNotification = functions.database.ref('/studentResponses/{bid}/{uid}/Answer Three').onCreate((event) => {

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

                body: 'A student has awnswered your third question, have a look.',
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

exports.sendQuestionsBusinessResponseNotification = functions.database.ref('/studentResponses/{bid}/{uid}').onUpdate((event) => {

    const uid = event.params.uid;
    const bid = event.params.bid;

    console.log(`${uid} liked ${bid}`);

    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin.database().ref(`/student/${uid}/FCM Token`).once('value');

    // Get liked profile
    const getLikedProfilePromise = admin.auth().getUser(bid);

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

                body: 'The status of one of your answers has changed. Take a look!',
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



exports.sendMatchedNotification = functions.database.ref('/matches/{uid}/{bid}').onWrite((event) => {

    const uid = event.params.uid;
    const bid = event.params.bid;

    console.log(`${bid} matched ${uid}`);

    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin.database().ref(`/student/${uid}/FCM Token`).once('value');

    // Get liked profile
    const getMatchedProfilePromise = admin.auth().getUser(bid);

    return Promise.all([getDeviceTokensPromise, getMatchedProfilePromise]).then((results) => {
        const tokensSnapshot = results[0];
        const matcher = results[1];

        // Check if there are any device tokens.
        if (!tokensSnapshot.hasChildren()) {
            return console.log('There are no notification tokens to send to.');
        }

        console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
        console.log('Fetched matcher profile', matcher);

        // Notification details
        const payload = {
            notification: {

                body: 'Congratulations! You have a new match',
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


exports.sendInviteNotification = functions.database.ref('/organisedChats/{uid}/{bid}').onCreate((event) => {

    const uid = event.params.uid;
    const bid = event.params.bid;

    console.log(`${bid} matched ${uid}`);

    // Get the list of device notification tokens.
    const getDeviceTokensPromise = admin.database().ref(`/student/${uid}/FCM Token`).once('value');

    // Get liked profile
    const getMatchedProfilePromise = admin.auth().getUser(bid);

    return Promise.all([getDeviceTokensPromise, getMatchedProfilePromise]).then((results) => {
        const tokensSnapshot = results[0];
        const matcher = results[1];

        // Check if there are any device tokens.
        if (!tokensSnapshot.hasChildren()) {
            return console.log('There are no notification tokens to send to.');
        }

        console.log('There are', tokensSnapshot.numChildren(), 'tokens to send notifications to.');
        console.log('Fetched matcher profile', matcher);

        // Notification details
        const payload = {
            notification: {

                body: 'Congratulations! You have a new interview invite',
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

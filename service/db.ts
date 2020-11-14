import * as admin from 'firebase-admin';

const config = {
	credential: admin.credential.cert({
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
		projectId: 'fe-i-e5e3c',
	}),
	databaseURL: 'https://fe-i-e5e3c.firebaseio.com/',
};

export const adminDb = !admin.apps.length
	? admin.initializeApp(config).database()
	: admin.database();

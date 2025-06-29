import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin'
import * as path from 'path'

@Injectable()
export class FirebaseService {

    constructor() {
        if (!admin.apps.length) {
            const serviceAccountPath = path.resolve(
                __dirname,
                '../../serviceAccountKey.json'
            );

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccountPath)
            });
        }
    }

    async sendPushMultipleUser(
        tokens,
        title: string,
        body: string
    ) {
        const message = {
            notification: {
                title,
                body,
            },
            tokens,
        };

        try {
            const res = await admin.messaging().sendEachForMulticast(message);
            console.log("send message success");
            return res;
        } catch (err) {
            console.error(err);
        }
    }
}

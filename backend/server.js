import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

function getPrivateKey() {
    return process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
}

function initializeFirebaseAdmin() {
    if (admin.apps.length) {
        return admin.app();
    }

    const projectId = process.env.FIREBASE_PROJECT_ID || 'handloom-fashion';
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = getPrivateKey();

    if (!clientEmail || !privateKey) {
        throw new Error('Missing Firebase Admin credentials. Set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.');
    }

    return admin.initializeApp({
        credential: admin.credential.cert({
            projectId,
            clientEmail,
            privateKey,
        }),
    });
}

initializeFirebaseAdmin();

const db = admin.firestore();

function mapDoc(doc) {
    return {
        id: doc.id,
        ...doc.data(),
    };
}

app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'handloom-fashion-api' });
});

app.get('/api/users', async (_req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        res.json(snapshot.docs.map(mapDoc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/users/:id', async (req, res) => {
    try {
        const doc = await db.collection('users').doc(req.params.id).get();

        if (!doc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.json(mapDoc(doc));
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

app.get('/api/orders', async (_req, res) => {
    try {
        const snapshot = await db.collection('orders').orderBy('createdAt', 'desc').get();
        res.json(snapshot.docs.map(mapDoc));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/orders', async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            createdAt: req.body.createdAt || new Date().toISOString(),
        };

        const ref = await db.collection('orders').add(orderData);
        const saved = await ref.get();
        res.status(201).json(mapDoc(saved));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
});

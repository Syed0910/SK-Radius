require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');

// ─── Config ────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 8005;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'test_database';
const CORS_ORIGINS = process.env.CORS_ORIGINS || '*';

// ─── MongoDB Client ────────────────────────────────────────────────────────────
let db;
const client = new MongoClient(MONGO_URL);

async function connectDB() {
    try {
        await client.connect();
        db = client.db(DB_NAME);
        console.log(`✅ Connected to MongoDB — database: "${DB_NAME}"`);
    } catch (err) {
        console.warn('⚠️  MongoDB connection failed:', err.message);
        console.warn('   DB-dependent routes will return 503 until MongoDB is available.');
    }
}

// ─── App Setup ────────────────────────────────────────────────────────────────
const app = express();

// CORS middleware — mirrors Python CORS_ORIGINS env var behaviour
const corsOptions = {
    origin: CORS_ORIGINS === '*' ? '*' : CORS_ORIGINS.split(',').map(o => o.trim()),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['*'],
};
app.use(cors(corsOptions));
app.use(express.json());

// ─── Routes (/api prefix mirrors FastAPI APIRouter) ───────────────────────────

// GET /api/
app.get('/api/', (req, res) => {
    res.json({ message: 'Hello World' });
});

// POST /api/status  — create a status check
app.post('/api/status', async (req, res) => {
    try {
        const { client_name } = req.body;

        if (!client_name) {
            return res.status(422).json({ detail: 'client_name is required' });
        }

        const statusObj = {
            id: uuidv4(),
            client_name,
            timestamp: new Date().toISOString(),
        };

        await db.collection('status_checks').insertOne({ ...statusObj });

        // Return without MongoDB _id
        res.status(200).json(statusObj);
    } catch (err) {
        console.error('POST /api/status error:', err);
        res.status(500).json({ detail: 'Internal Server Error' });
    }
});

// GET /api/status  — fetch all status checks
app.get('/api/status', async (req, res) => {
    try {
        const statusChecks = await db
            .collection('status_checks')
            .find({}, { projection: { _id: 0 } })
            .limit(1000)
            .toArray();

        res.json(statusChecks);
    } catch (err) {
        console.error('GET /api/status error:', err);
        res.status(500).json({ detail: 'Internal Server Error' });
    }
});

// ─── 404 Fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).json({ detail: 'Not Found' });
});

// ─── Start ────────────────────────────────────────────────────────────────────

// Start HTTP server first so it is always reachable, then connect to MongoDB
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`   CORS origins: ${CORS_ORIGINS}`);
    console.log(`   MongoDB: ${MONGO_URL} / ${DB_NAME}`);
});

// Connect to MongoDB in the background — routes will return 503 if DB isn't ready yet
connectDB();

// ─── Graceful Shutdown ────────────────────────────────────────────────────────
process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down...');
    await client.close();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await client.close();
    process.exit(0);
});

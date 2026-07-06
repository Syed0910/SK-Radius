require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const { connectDB, sequelize } = require('./config/database');
const models = require('./models'); // Load models and associations

// Import routes (adapted for SK-Radius packages)
const packageRoutes = require('./routes/packageRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Global middleware
app.use(helmet({ crossOriginResourcePolicy: false })); // Allow cross-origin image loading
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Request logging middleware
app.use((req, res, next) => {
    console.log('\n' + '='.repeat(80));
    console.log('📥 INCOMING REQUEST');
    console.log('='.repeat(80));
    console.log('Method:', req.method);
    console.log('URL:', req.url);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));
    console.log('='.repeat(80) + '\n');
    next();
});

// Serve photos/static files if needed
app.use('/src/photos', express.static(path.join(__dirname, 'photos')));

// Routes
app.use('/api/packages', packageRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', database: 'connected' });
});

// Database and server startup
const startServer = async () => {
    try {
        await connectDB();
        // Sync models to database (creates missing tables only - no alter to prevent duplicate indexes)
        await sequelize.sync({ alter: false });
        console.log('✅ Database models synchronized');
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();

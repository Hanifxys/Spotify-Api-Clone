const express = require('express');
const session = require('express-session');
const cors = require('cors');
const config = require('../config');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorRoutes = require('./routes/errorRoutes');
const checkTokenExpiration = require('./middlewares/checkTokenExpiration');

const app = express();

// Menggunakan middleware CORS
app.use(cors());

// Konfigurasi dan Middleware
console.log("Session secret:", config.SESSION_SECRET);
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

const unprotectedRoutes = ['/login', '/callback', '/error'];
app.use((req, res, next) => {
    if (unprotectedRoutes.includes(req.path)) {
        return next();
    }
    checkTokenExpiration(req, res, next);
});

// Menggunakan Routes
app.use(authRoutes);
app.use(userRoutes);
app.use(errorRoutes);

// Handler untuk 404 - Not Found
app.use((req, res, next) => {
    res.status(404).send({
        status: 404,
        message: 'Not Found'
    });
});

// Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        status: 500,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// Memulai server
app.listen(config.PORT, () => {
    console.log(`Server is running on http://localhost:${config.PORT}`);
});

require('dotenv').config();

module.exports = {
  SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI,
  SESSION_SECRET: process.env.SESSION_SECRET,
  PORT: process.env.PORT || 3000  // Jika PORT tidak ditentukan di .env, defaultnya adalah 3000
};

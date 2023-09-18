const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

router.get('/login', (req, res) => {
    const scopes = 'user-read-private user-read-email user-top-read';  // Tambahkan user-top-read
    res.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${config.SPOTIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(config.REDIRECT_URI)}`);
});

router.get('/callback', (req, res) => {
    const code = req.query.code;
    if (!code) return res.redirect('/error');

    // Use Buffer.from instead of new Buffer for safety
    const authData = Buffer.from(config.SPOTIFY_CLIENT_ID + ':' + config.SPOTIFY_CLIENT_SECRET).toString('base64');
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: `grant_type=authorization_code&code=${code}&redirect_uri=${config.REDIRECT_URI}`,
        headers: {
            'Authorization': `Basic ${authData}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(authOptions)
        .then(response => {
            req.session.accessToken = response.data.access_token;
            req.session.refreshToken = response.data.refresh_token;
            res.redirect('/');
        })
        .catch(error => {
            console.error("Error fetching access token", error);
            res.redirect('/error');
        });
});
router.get('/refresh_token', (req, res) => {
    if (!req.session.refreshToken) return res.redirect('/login');

    // Use Buffer.from instead of new Buffer for safety
    const authData = Buffer.from(config.SPOTIFY_CLIENT_ID + ':' + config.SPOTIFY_CLIENT_SECRET).toString('base64');
    const authOptions = {
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: `grant_type=refresh_token&refresh_token=${req.session.refreshToken}`,
        headers: {
            'Authorization': `Basic ${authData}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true
    };

    axios(authOptions)
        .then(response => {
            req.session.accessToken = response.data.access_token;
            res.redirect('/');
        })
        .catch(error => {
            console.error("Error refreshing access token", error);
            res.redirect('/error');
        });
});

module.exports = router;

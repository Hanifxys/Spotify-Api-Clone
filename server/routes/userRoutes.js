const express = require('express');
const axios = require('axios');
const config = require('../../config');

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.session.accessToken) {
        return res.redirect('/login');
    }

    const options = {
        headers: { 'Authorization': 'Bearer ' + req.session.accessToken },
        json: true
    };

    try {
        const [profileResponse, playlistsResponse, topTracksResponse, recommendationsResponse] = await Promise.all([
            axios.get('https://api.spotify.com/v1/me', options),
            axios.get('https://api.spotify.com/v1/me/playlists', options),
            axios.get('https://api.spotify.com/v1/me/top/tracks', options),
            axios.get(`https://api.spotify.com/v1/recommendations?seed_genres=pop`, options)  // Saya memakai 'pop' sebagai contoh mood, Anda bisa mengubahnya
        ]);

        const userProfile = profileResponse.data;
        const favoritePlaylists = playlistsResponse.data.items;
        const topTracks = topTracksResponse.data.items;
        const recommendations = recommendationsResponse.data.tracks;

        const html = `
        <html>
            <body>
                <h1>Selamat datang, ${userProfile.display_name}!</h1>

                <h2>Playlist Favorit Anda:</h2>
                <ul>
                    ${favoritePlaylists.map(playlist => `<li>${playlist.name}</li>`).join('')}
                </ul>

                <h2>Lagu Terbaik Anda:</h2>
                <ul>
                    ${topTracks.map(track => `<li>${track.name} by ${track.artists.map(artist => artist.name).join(', ')}</li>`).join('')}
                </ul>

                <h2>Rekomendasi untuk Anda:</h2>
                <ul>
                    ${recommendations.map(track => `<li>${track.name} by ${track.artists.map(artist => artist.name).join(', ')}</li>`).join('')}
                </ul>
            </body>
        </html>    
        `;

        res.send(html);
    } catch (error) {
        console.error("Error fetching user data", error);
        res.redirect('/error');
    }
});


router.get('/profile', (req, res) => {
    if (!req.session.accessToken) {
        return res.redirect('/login');
    }

    const options = {
        headers: { 'Authorization': 'Bearer ' + req.session.accessToken },
        json: true
    };

    axios.get('https://api.spotify.com/v1/me', options)
        .then(response => {
            const user = response.data;
            
            // Format response ke dalam HTML
            const html = `
                <html>
                <head>
                    <title>Profil Spotify</title>
                </head>
                <body>
                    <h1>Selamat datang, ${user.display_name}!</h1>
                    <p><a href="${user.external_urls.spotify}">Profil Spotify Anda</a></p>
                    <p>Email: ${user.email}</p>
                    <p>Negara: ${user.country}</p>
                    <p>Tipe Akun: ${user.product}</p>
                    <p>Jumlah Pengikut: ${user.followers.total}</p>
                </body>
                </html>
            `;

            res.send(html);
        })
        .catch(error => {
            console.error("Error accessing user's profile", error);
            res.status(500).send('Error accessing user profile.');
        });
});
router.get('/favorite-playlists', (req, res) => {
    // Your favorite playlists handling logic
    if (!req.session.accessToken) {
        return res.redirect('/login');
    }

    const options = {
        headers: { 'Authorization': 'Bearer ' + req.session.accessToken },
        json: true
    };

    axios.get('https://api.spotify.com/v1/me/playlists', options)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error("Error accessing user's favorite playlists", error);
            res.status(500).send('Error accessing favorite playlists.');
        });
});

router.get('/top-tracks', (req, res) => {
    // Your top tracks handling logic
  if (!req.session.accessToken) {
        return res.redirect('/login');
    }

    const options = {
        headers: { 'Authorization': 'Bearer ' + req.session.accessToken },
        json: true
    };

    axios.get('https://api.spotify.com/v1/me/top/tracks', options)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error("Error accessing user's top tracks", error);
            res.status(500).send('Error accessing top tracks.');
        });
});

router.get('/recommendations', (req, res) => {
    const mood = req.query.mood;
    
    if (!mood) {
        return res.status(400).send({ message: "Parameter 'mood' is required." });
    }

    if (!req.session.accessToken) {
        return res.redirect('/login');
    }

    const options = {
        headers: { 'Authorization': 'Bearer ' + req.session.accessToken },
        json: true
    };

    axios.get(`https://api.spotify.com/v1/recommendations?seed_genres=${mood}`, options)
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            console.error("Error accessing recommendations", error);
            res.status(500).send('Error accessing recommendations.');
        });
});

module.exports = router;

const axios = require('axios');

function checkTokenExpiration(req, res, next) {
    if (!req.session.accessToken) {
        return res.redirect('/login');
    }

    const options = {
        headers: { 'Authorization': 'Bearer ' + req.session.accessToken }
    };

    axios.get('https://api.spotify.com/v1/me', options)
        .then(() => next())
        .catch(error => {
            if (error.response && error.response.status === 401) {
                console.error("Access token expired");
                return res.redirect('/refresh_token');
            }
            next(error);
        });
    }

module.exports = checkTokenExpiration;

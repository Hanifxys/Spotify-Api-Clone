// components/Navbar/index.js

import React from 'react';
import './navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-logo">
                SpotifyClone
            </div>
            <div className="navbar-links">
                <a className="navbar-link" href="/">Home</a>
                <a className="navbar-link" href="/profile">Profile</a>
                <a className="navbar-link" href="/top-tracks">Top Tracks</a>
                <a className="navbar-link" href="/recommendations">Recommendations</a>
            </div>
        </div>
    );
};

export default Navbar;

// pages/TopTracksPage/index.js

import React, { useState, useEffect } from 'react';
import { fetchTopTracks } from '../../api/spotify';

const TopTracksPage = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const token = 'YOUR_ACCESS_TOKEN';
        fetchTopTracks(token).then(response => {
            setTracks(response.data.items);
        }).catch(error => {
            console.error("Failed to fetch top tracks:", error);
        });
    }, []);

    if (!tracks.length) return <div>Loading...</div>;

    return (
        <div className="top-tracks-page">
            <h1>Your Top Tracks</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>{track.name} by {track.artists[0].name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TopTracksPage;

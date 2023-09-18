// pages/RecommendationsPage/index.js

import React, { useState, useEffect } from 'react';
import { fetchRecommendations } from '../../api/spotify';

const RecommendationsPage = () => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        const token = 'YOUR_ACCESS_TOKEN';
        fetchRecommendations(token).then(response => {
            setTracks(response.data.items);
        }).catch(error => {
            console.error("Failed to fetch recommendations:", error);
        });
    }, []);

    if (!tracks.length) return <div>Loading...</div>;

    return (
        <div className="recommendations-page">
            <h1>Recommended Tracks for You</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>{track.name} by {track.artists[0].name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendationsPage;

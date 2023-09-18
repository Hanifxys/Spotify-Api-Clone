// pages/ProfilePage/index.js

import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../../api/spotify';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const token = 'YOUR_ACCESS_TOKEN';
        fetchUserProfile(token).then(response => {
            setProfile(response.data);
        }).catch(error => {
            console.error("Failed to fetch user profile:", error);
        });
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="profile-page">
            <h1>{profile.name}</h1>
            <p>Email: {profile.email}</p>
            <p>Country: {profile.country}</p>
        </div>
    );
};

export default ProfilePage;

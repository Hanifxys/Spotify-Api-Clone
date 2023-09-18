import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; 

// Fungsi untuk mengambil profil pengguna
export const fetchUserProfile = (token) => {
    return axios.get(`${BASE_URL}/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

// Fungsi untuk mengambil playlist favorit pengguna
export const fetchFavoritePlaylists = (token) => {
    return axios.get(`${BASE_URL}/favorite-playlists`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

// Fungsi untuk mengambil lagu top pengguna
export const fetchTopTracks = (token) => {
    return axios.get(`${BASE_URL}/top-tracks`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
};

// Fungsi untuk mengambil rekomendasi lagu berdasarkan mood
export const fetchRecommendations = (token, mood) => {
    return axios.get(`${BASE_URL}/recommendations`, {
        headers: { 'Authorization': `Bearer ${token}` },
        params: { mood }  // contoh penggunaan: { mood: "pop" }
    });
};

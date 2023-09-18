import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import RecommendationsPage from './pages/RecommendationsPage';
import TopTracksPage from './pages/TopTracksPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/top-tracks" element={<TopTracksPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;

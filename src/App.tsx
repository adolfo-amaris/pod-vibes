import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import PodcastDetailPage from './pages/PodcastDetailPage/PodcastDetailPage';
import EpisodeDetailPage from './pages/EpisodeDetailPage/EpisodeDetailPage';
import Header from './components/Header/Header';
import { LoadingProvider } from './context/LoadingContext';


const App: React.FC = () => {
  return (
    <Router>

      <LoadingProvider>

        {/* El Header se muestra en todas las páginas */}
        <Header />

        <Routes>
          {/* Ruta para la página principal */}
          <Route path="/" element={<HomePage />} />

          {/* Ruta para el detalle de un podcast */}
          <Route path="/podcast/:podcastId" element={<PodcastDetailPage />} />

          {/* Ruta para el detalle de un episodio */}
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetailPage />}
          />
        </Routes>

      </LoadingProvider>
      
    </Router>
  );
};

export default App;

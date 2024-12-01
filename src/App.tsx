import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './ui/pages/HomePage';
import PodcastDetailPage from './ui/pages/PodcastDetailPage';
import EpisodeDetailPage from './ui/pages/EpisodeDetailPage';
import Header from './ui/components/Header';
import { LoadingProvider } from './shared/context/LoadingContext';
import { NavigationProvider } from './application/context/NavigationContext';
import { PodcastServiceProvider } from './application/interfaces/PodcastServiceContext';


const App: React.FC = () => {
  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}>
      <NavigationProvider>

        <LoadingProvider>

          <PodcastServiceProvider> {/* Añadir el proveedor aquí */}

            {/* El Header se muestra en todas las páginas */}
            <Header />

            <Routes>

              {/* Ruta para la página principal */}
              <Route path="/" element={<HomePage />} />

              {/* Ruta para el detalle de un episodio */}
              <Route path="/podcast/:podcastId" element={<PodcastDetailPage />}>
                <Route path="episode/:episodeId" element={<EpisodeDetailPage />} />
              </Route>

            </Routes>

          </PodcastServiceProvider>

        </LoadingProvider>
        
      </NavigationProvider>


    </Router>
  );
};

export default App;

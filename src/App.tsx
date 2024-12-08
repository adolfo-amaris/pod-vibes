import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PopularPodcastsPage from './podcastManagement/presentation/pages/PopularPodcastsPage';
import PodcastDetailPage from './podcastManagement/presentation/pages/PodcastDetailPage';
import EpisodeDetailPage from './podcastManagement/presentation/pages/EpisodeDetailPage';
import Header from './podcastManagement/presentation/components/Header';
import { LoadingProvider } from './shared/context/LoadingContext';
import { NavigationProvider } from './podcastManagement/presentation/context/NavigationContext';
import { PodcastProvider } from './podcastManagement/presentation/context/PodcastProvider';
import { PodcastServiceProvider } from './podcastManagement/infrastructure/context/PodcastServiceContext';

const App: React.FC = () => {
  return (
    <Router
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <NavigationProvider>
        <LoadingProvider>
          <PodcastServiceProvider>
            <PodcastProvider>
              {' '}
              {/* Añadir el proveedor aquí */}
              {/* El Header se muestra en todas las páginas */}
              <Header />
              <Routes>
                {/* Ruta para la página principal */}
                <Route path="/" element={<PopularPodcastsPage />} />

                {/* Ruta para el detalle de un episodio */}
                <Route
                  path="/podcast/:podcastId"
                  element={<PodcastDetailPage />}
                >
                  <Route
                    path="episode/:episodeId"
                    element={<EpisodeDetailPage />}
                  />
                </Route>
              </Routes>
            </PodcastProvider>
          </PodcastServiceProvider>
        </LoadingProvider>
      </NavigationProvider>
    </Router>
  );
};

export default App;

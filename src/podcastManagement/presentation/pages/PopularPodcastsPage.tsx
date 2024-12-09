import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePopularPodcasts } from '../hooks/usePopularPodcasts';
import { usePodcastFilter } from '../hooks/usePodcastFilter';
import Card from '../components/PodcastCard';
import Filter from '../components/Filter';
import './../../../shared/styles/popularPodcastsPage.scss';

const PopularPodcastsPage: React.FC = () => {
  const { podcasts, error } = usePopularPodcasts(); // Usar el hook modificado
  const { filter, setFilter, filteredPodcasts } = usePodcastFilter(podcasts);
  const navigate = useNavigate();

  // Mostrar mensaje de "Cargando" si el estado loading está activo
  if (podcasts.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando los podcasts más populares...</p>;
  }

  if (error) {
    return <p style={{ textAlign: 'center', marginTop: '20px', color: 'red' }}>{error}</p>;
  }
  return (
    <div className="boxppal flex flex-column" role="podcast-list">
      <div className="boxfilter">
        <Filter
          filter={filter}
          setFilter={setFilter}
          placeholder="Filter podcasts..."
          count={filteredPodcasts.length}
        />
      </div>

      {filteredPodcasts && filteredPodcasts.length > 0 ? (
        <div className="boxppal__card">
          {filteredPodcasts.map((podcast) => (
            <Card
              key={podcast.id}
              image={podcast.image}
              title={podcast.title}
              author={podcast.author}
              onClick={() => navigate(`/podcast/${podcast.id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="boxppal__not-found">No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default PopularPodcastsPage;

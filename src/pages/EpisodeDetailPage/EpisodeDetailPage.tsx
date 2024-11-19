import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPodcastDetailsWithCache } from '../../services/podcastService';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';

const EpisodeDetailPage: React.FC = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();
  const [episode, setEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadEpisodeDetails = async () => {
      try {
        setLoading(true);
        setError(false);
        const podcastData = await fetchPodcastDetailsWithCache(podcastId!);
        const foundEpisode = podcastData.episodes.find((ep: any) => ep.trackId === Number(episodeId));
        if (!foundEpisode) {
          throw new Error('Episodio no encontrado');
        }
        setEpisode(foundEpisode);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar el episodio:', error);
        setError(true);
        setLoading(false);
      }
    };

    loadEpisodeDetails();
  }, [podcastId, episodeId]);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error || !episode) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Error al cargar los detalles del episodio. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1>{episode.trackName}</h1>
      <p style={dateStyle}>Fecha de publicación: {new Date(episode.releaseDate).toLocaleDateString()}</p>
      <div style={descriptionStyle} dangerouslySetInnerHTML={{ __html: episode.description }}></div>
      <audio controls style={audioStyle}>
        <source src={episode.episodeUrl} type="audio/mpeg" />
        Tu navegador no soporta el reproductor de audio.
      </audio>
    </div>
  );
};

// Estilos del componente
const containerStyle = {
  padding: '20px',
};

const dateStyle = {
  color: '#666',
  marginBottom: '10px',
};

const descriptionStyle = {
  marginBottom: '20px',
  lineHeight: '1.6',
};

const audioStyle = {
  width: '100%',
};

export default EpisodeDetailPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPodcastDetailsWithCache } from '../../services/podcastService';
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator';


const PodcastDetailPage: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>(); // Obtener el ID del podcast desde la URL
  const [podcast, setPodcast] = useState<any>(null); // Estado para los detalles del podcast
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(false); // Estado de error

  console.log('Podcast ID:', podcastId);

  useEffect(() => {
    const loadPodcastDetails = async () => {
      try {
        setError(false); // Reiniciar estado de error
        setLoading(true); // Activar estado de carga
        const data = await fetchPodcastDetailsWithCache(podcastId!); // Obtener los detalles desde el servicio
        setPodcast(data); // Actualizar el estado con los datos obtenidos
        setLoading(false); // Desactivar estado de carga
      } catch (error) {
        setError(true); // Activar estado de error
        console.error('Error al cargar los detalles del podcast:', error);
        setLoading(false); // Desactivar estado de carga en caso de error
      }
    };

    loadPodcastDetails();
  }, [podcastId]);

  // Mostrar el indicador de carga si los datos aún no están disponibles
  if (loading) {
    return <LoadingIndicator />;
  }

  // Mostrar mensaje de error si ocurre un problema al cargar los datos
  if (error || !podcast) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Error al cargar los detalles del podcast. Por favor, inténtalo de nuevo más tarde.</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 20px',
            fontSize: '16px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }


  return (
    <div style={containerStyle}>
      {/* Información del podcast */}
      <div style={detailsStyle}>
        <img src={podcast.details.artworkUrl600} alt={podcast.details.collectionName} style={imageStyle} />
        <h1>{podcast.details.collectionName}</h1>
        <h2>{podcast.details.artistName}</h2>
        <p>{podcast.details.description || 'No hay descripción disponible.'}</p>
      </div>

      {/* Lista de episodios */}
      <div style={episodesStyle}>
        <h3>Episodios</h3>
        <ul style={episodeListStyle}>
          {podcast.episodes.map((episode: any) => (
            <li key={episode.trackId} style={episodeItemStyle}>
              <a href={`/podcast/${podcastId}/episode/${episode.trackId}`} style={episodeLinkStyle}>
                {episode.trackName}
              </a>
              <span style={durationStyle}>{formatDuration(episode.trackTimeMillis)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

};

// Función para formatear la duración de los episodios en minutos y segundos
const formatDuration = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds.padStart(2, '0')}`;
};

// Estilos del componente
const containerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  padding: '20px',
};

const detailsStyle = {
  marginBottom: '20px',
};

const imageStyle = {
  maxWidth: '300px',
  marginBottom: '20px',
};

const episodesStyle = {
  marginTop: '20px',
};

const episodeListStyle = {
  listStyleType: 'none' as const,
  padding: 0,
};

const episodeItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px solid #ddd',
};

const episodeLinkStyle = {
  textDecoration: 'none' as const,
  color: '#007BFF',
};

const durationStyle = {
  color: '#666',
};

export default PodcastDetailPage;

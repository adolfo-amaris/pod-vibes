import React, { useEffect, useState } from 'react';
import { fetchPodcastDetailsWithCache } from '../../services/podcastService';
import { useNavigation } from '../../context/NavigationContext';
import { useLoading } from '../../context/LoadingContext';
import EpisodeDetailPage from '../EpisodeDetailPage/EpisodeDetailPage';

const PodcastDetailPage: React.FC = () => {
  // Contexto de navegación para gestionar el podcast y episodio seleccionados
  const { selectedPodcast, setSelectedPodcast, selectedEpisode, setSelectedEpisode } = useNavigation();
  const [podcast, setPodcast] = useState<any>(null); // Estado para almacenar los detalles del podcast
  const { loading, setLoading } = useLoading(); // Uso del estado global de carga

  // Efecto para cargar los detalles del podcast al montar el componente
  useEffect(() => {

    const loadPodcastDetails = async () => {

      try {
        setLoading(true);
        const data = await fetchPodcastDetailsWithCache(selectedPodcast!); // Llama al servicio para obtener los detalles
        setPodcast(data); // Guarda los datos del podcast en el estado
        console.log('Detalles del podcast:', data);
      } catch (error) {
        console.error('Error al cargar los detalles del podcast:', error);
      } finally {
        setLoading(false);
      }

    };

    if (selectedPodcast) {
      loadPodcastDetails();
    }

  }, [selectedPodcast, loading]);


  // Si no se pudo cargar el podcast, muestra un mensaje de error
  if (!podcast && !loading) {

    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>Error al cargar los detalles del podcast. Por favor, inténtalo de nuevo más tarde.</p>
        <button
          onClick={() => setSelectedPodcast(null)} // Permite volver al listado de podcasts
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
          Volver
        </button>
      </div>
    );

  }

  if (!podcast || !podcast.episodes) {
    return <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando detalles del podcast...</p>;
  }

  // Función para formatear la duración de los episodios
  const formatDuration = (millis: number) => {
    if (!millis) return "Duración no disponible"; // Maneja el caso cuando millis es undefined
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  // Si hay un episodio seleccionado, renderiza el detalle del episodio
  if (selectedEpisode) {
    return <EpisodeDetailPage />;
  }

  // Renderiza el detalle del podcast y la lista de episodios
  return (
    <div style={{ padding: '20px' }}>
      {/* Detalles del podcast */}
      <div style={{ marginBottom: '20px' }}>
        <img
          src={podcast.details.artworkUrl600}
          alt={podcast.details.collectionName}
          style={{ maxWidth: '300px', marginBottom: '20px' }}
        />
        <h1>{podcast.details.collectionName}</h1>
        <h2 style={{ color: '#666' }}>{podcast.details.artistName}</h2>
        <p>{podcast.details.description || 'No hay descripción disponible.'}</p>
      </div>

      {/* Lista de episodios */}
      <div>
        <h3>Episodios</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {podcast.episodes.map((episode: any) => (
            <li
              key={episode.trackId}
              style={{
                padding: '10px 0',
                borderBottom: '1px solid #ddd',
                cursor: 'pointer',
              }}
              onClick={() => {
                console.log('Episodio seleccionado:', episode); // Debug: valida el episodio seleccionado
                setSelectedEpisode(episode); // Guarda el episodio seleccionado en el contexto
              }}
            >
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>{episode.trackName}</p>
                <small style={{ color: '#666' }}>
                  Duración: {formatDuration(episode.trackTimeMillis)}
                </small>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón para volver al listado de podcasts */}
      <button
        onClick={() => setSelectedPodcast(null)}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Volver a podcasts
      </button>
    </div>
  );
};

export default PodcastDetailPage;

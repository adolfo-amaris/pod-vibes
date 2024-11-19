import React from 'react';
import { useNavigation } from '../../context/NavigationContext';

const EpisodeDetailPage: React.FC = () => {
  // Obtiene el episodio seleccionado desde el contexto de navegación
  const { selectedEpisode, setSelectedEpisode } = useNavigation();

  // Si no hay un episodio seleccionado, muestra un mensaje o retorna a los episodios
  if (!selectedEpisode) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>No se seleccionó ningún episodio. Por favor, vuelve a la lista de episodios.</p>
        <button
          onClick={() => setSelectedEpisode(null)} // Permite regresar a la lista de episodios
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

  return (
    <div style={{ padding: '20px' }}>
      {/* Título del episodio */}
      <h1>{selectedEpisode.trackName}</h1>

      {/* Fecha de publicación */}
      <p style={{ color: '#666', marginBottom: '10px' }}>
        Fecha de publicación: {new Date(selectedEpisode.releaseDate).toLocaleDateString()}
      </p>

      {/* Descripción del episodio */}
      <div
        style={{ marginBottom: '20px', lineHeight: '1.6' }}
        dangerouslySetInnerHTML={{ __html: selectedEpisode.description }}
      ></div>

      {/* Reproductor de audio */}
      <audio controls style={{ width: '100%' }}>
        <source src={selectedEpisode.episodeUrl} type="audio/mpeg" />
        Tu navegador no soporta el reproductor de audio.
      </audio>

      {/* Botón para regresar a la lista de episodios */}
      <button
        onClick={() => setSelectedEpisode(null)}
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
        Volver a episodios
      </button>
    </div>
  );
};

export default EpisodeDetailPage;

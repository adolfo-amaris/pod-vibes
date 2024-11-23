import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import './../../styles/episodeDetailPage.scss';


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
    <div className='boxepisode boxstyles'>
      {/* Título del episodio */}
      <h1>{selectedEpisode.trackName}</h1>

      {/* Fecha de publicación */}
      <p>
        Fecha de publicación: {new Date(selectedEpisode.releaseDate).toLocaleDateString()}
      </p>

      {/* Descripción del episodio */}
      <div
        className='boxepisode__description'        
        dangerouslySetInnerHTML={{ __html: selectedEpisode.description }}
      ></div>

      {/* Reproductor de audio */}
      <audio controls>
        <source src={selectedEpisode.episodeUrl} type="audio/mpeg" />
        Tu navegador no soporta el reproductor de audio.
      </audio>
    </div>
  );
};

export default EpisodeDetailPage;

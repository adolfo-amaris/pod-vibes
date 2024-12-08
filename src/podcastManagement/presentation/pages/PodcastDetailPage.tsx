import React, { useEffect } from 'react';
import { useParams, useNavigate, Outlet, useMatch } from 'react-router-dom';
import { usePodcastUseCases } from '../context/PodcastProvider';
import { usePodcastDetails } from '../hooks/usePodcastDetails';
import { useLoading } from '../../../shared/context/LoadingContext';
import '../../../shared/styles/podcastDetailPage.scss';

const PodcastDetailPage: React.FC = () => {
  const { podcastId } = useParams<{ podcastId: string }>();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { getPodcastDetailsUseCase } = usePodcastUseCases();

  if (!podcastId) {
    return (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        No se encontró el podcast seleccionado. Por favor, selecciona otro.
      </p>
    );
  }

  const { podcast, episodes, loading, error } = usePodcastDetails({
    podcastId,
    getPodcastDetailsUseCase,
  });

  // Verificar si la ruta actual coincide con un episodio
  const isEpisodeSelected = useMatch('/podcast/:podcastId/episode/:episodeId');


  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false);
  }, [loading, setLoading]);

  if (loading) {
    return (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Cargando detalles del podcast...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        {error || 'Error al cargar el podcast.'}
      </p>
    );
  }

  return (
    <div className="boxdetail flex">
      {/* Información del podcast */}
      {podcast && (
        <div className="boxdetail__container boxstyles">
          <div className="boxdetail__boxpodcast flex flex-column">
            <img
              className="boxpodcast_img hoverEffect"
              src={podcast.image}
              alt={podcast.title}
              onClick={() => navigate(`/podcast/${podcastId}`)}
            />
            <hr />
            <div className="boxpodcast_name">
              <h1>{podcast.title}</h1>
              <h3>by {podcast.author}</h3>
            </div>
            <hr />
            <p className="boxpodcast_description">
              <span>Description:</span>
              <br />
              {podcast.summary || 'No hay descripción disponible.'}
            </p>
          </div>
        </div>
      )}

      {/* Lista de episodios */}
      {!isEpisodeSelected && episodes && episodes.length > 0 && (
        <div className="boxepisode__list">
          <div className="boxepisode__header flex flex-center justify-between boxstyles">
            <h1 className="boxepisode__title">Episodes {episodes.length}</h1>
          </div>
          <div className="episodes flex flex-column boxstyles">
            <div className="episodes__card flex boxstyles" >
              <div className="episodes__card-title bold">Title</div>
              <div className="episodes__card-date bold"> Date</div>
              <div className="episodes__card-duration bold">Duration</div>
            </div>

            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="episodes__card flex hoverEffect boxstyles"
                onClick={() => navigate(`/podcast/${podcastId}/episode/${episode.id}`)}
              >
                <div className="episodes__card-title">{episode.title}</div>
                <div className="episodes__card-date">
                  {new Date(episode.releaseDate).toLocaleDateString()}
                </div>
                <div className="episodes__card-duration">{episode.formatDuration()}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Si no hay episodios */}
      {(!episodes || episodes.length === 0) && (
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          No hay episodios disponibles para este podcast.
        </p>
      )}

      {/* Mostrar el reproductor de episodios si hay un episodio seleccionado */}
      {isEpisodeSelected && <Outlet />}

    </div>
  );
};

export default PodcastDetailPage;

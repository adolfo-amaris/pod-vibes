import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePodcastUseCases } from '../context/PodcastProvider';
import { usePodcastDetails } from '../hooks/usePodcastDetails';
import { useLoading } from '../../../shared/context/LoadingContext';
import '../../../shared/styles/episodeDetailPage.scss';

const EpisodeDetailPage: React.FC = () => {
  const { podcastId, episodeId } = useParams<{
    podcastId: string;
    episodeId: string;
  }>();
  const { setLoading } = useLoading();
  const { getPodcastDetailsUseCase } = usePodcastUseCases();

  const { episodes, loading, error } = usePodcastDetails({
    podcastId: podcastId!,
    getPodcastDetailsUseCase,
  });

  useEffect(() => {
    setLoading(loading);
    return () => setLoading(false);
  }, [loading, setLoading]);

  if (loading) {
    return (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Cargando episodio...
      </p>
    );
  }

  if (error || !episodes) {
    return (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Error al cargar el episodio seleccionado.
      </p>
    );
  }

  const episode = episodes.find((ep) => ep.id === episodeId);
  if (!episode) {
    return (
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Episodio no encontrado.
      </p>
    );
  }

  return (
    <div className="boxepisode boxstyles">
      <h1>{episode.title}</h1>
      <p>
        Fecha de publicación:{' '}
        {new Date(episode.releaseDate).toLocaleDateString()}
      </p>
      <div
        className="boxepisode__description"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      ></div>
      <audio controls>
        <source src={episode.audioUrl} type="audio/mpeg" />
        Tu navegador no soporta el reproductor de audio.
      </audio>
    </div>
  );
};

export default EpisodeDetailPage;

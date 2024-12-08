import { useState, useEffect } from 'react';
import { GetPodcastDetailsUseCase } from '../../application/use-cases/GetPodcastDetailsUseCase';
import { Podcast } from '../../domain/entities/podcast';
import { Episode } from '../../domain/entities/episode';

type UsePodcastDetailsParams = {
  podcastId: string;
  getPodcastDetailsUseCase: GetPodcastDetailsUseCase;
};

export const usePodcastDetails = ({ podcastId, getPodcastDetailsUseCase }: UsePodcastDetailsParams) => {
  const [podcast, setPodcast] = useState<Podcast | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcastDetails = async () => {
      try {
        setLoading(true);
        const details = await getPodcastDetailsUseCase.execute(podcastId);

        if (details?.podcast && details?.episodes) {
          setPodcast(details.podcast);
          setEpisodes(details.episodes);
        } else {
          setError('Detalles del podcast o episodios no disponibles.');
        }
      } catch (err) {
        console.warn(err);
        setError('Error al obtener los detalles del podcast.');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcastDetails();
  }, [podcastId, getPodcastDetailsUseCase]);

  return { podcast, episodes, loading, error };
};

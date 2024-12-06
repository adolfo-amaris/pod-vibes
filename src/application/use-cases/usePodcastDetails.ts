import { useState, useEffect } from 'react';
import { usePodcastService } from '../../infrastructure/context/PodcastServiceContext';
import { PodcastDetailsResponse } from '../../domain/types/apiResponses';
import { transformPodcastDetails } from '../../domain/services/podcastDetailsTransformer';

export const usePodcastDetails = (podcastId: string | null) => {
  const podcastService = usePodcastService();
  const [podcastDetails, setPodcastDetails] =
    useState<PodcastDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDetails = async () => {
      if (!podcastId) {
        setError('El ID del podcast es inválido.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);

        // Llama al servicio y transforma los datos
        const rawDetails =
          await podcastService.fetchPodcastDetailsWithCache(podcastId);

        // Valida y transforma los datos
        const transformedDetails = transformPodcastDetails(rawDetails);

        setPodcastDetails(transformedDetails);
        setError(null); // Limpia cualquier error previo
      } catch (err) {
        console.error('Error al cargar los detalles del podcast:', err);
        setError('Error al cargar los detalles del podcast.');
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [podcastId, podcastService]);

  return { podcastDetails, loading, error };
};

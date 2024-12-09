import { useState, useEffect } from 'react';
import { Podcast } from './../../domain/entities/podcast';
import { usePodcastUseCases } from './../context/PodcastProvider';
import { useLoading } from '../../../shared/context/LoadingContext';

export const usePopularPodcasts = () => {
  const { getPopularPodcastsUseCase } = usePodcastUseCases(); // Obtener caso de uso
  const { setLoading } = useLoading(); // Usar LoadingContext
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true); // Asegura que el estado de carga sea activado siempre
      try {
        const storedPodcasts = localStorage.getItem('podcasts');
        if (storedPodcasts) {
          const parsedPodcasts = JSON.parse(storedPodcasts);
          setPodcasts(parsedPodcasts);
          return;
        }

        // Si no están en localStorage, cargar desde el caso de uso
        const fetchedPodcasts = await getPopularPodcastsUseCase.execute();
        setPodcasts(fetchedPodcasts);

        // Guardar en localStorage
        localStorage.setItem('podcasts', JSON.stringify(fetchedPodcasts));
      } catch (err) {
        console.warn('Error al obtener los podcasts:', err);
        setError('Error al obtener los podcasts más populares.');
      } finally {
        setLoading(false); // Desactiva el estado de carga al finalizar
      }
    };

    fetchPodcasts();
  }, [getPopularPodcastsUseCase, setLoading]);

  return { podcasts, error };
};

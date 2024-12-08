import { useState, useEffect } from 'react';
import { Podcast } from '../../domain/entities/podcast';
import { GetPopularPodcastsUseCase } from '../../application/use-cases/GetPopularPodcastsUseCase';

type UsePopularPodcastsParams = {
    getPopularPodcastsUseCase: GetPopularPodcastsUseCase; // Inyección del caso de uso
};

export const usePopularPodcasts = ({ getPopularPodcastsUseCase }: UsePopularPodcastsParams) => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                setLoading(true);
                const podcasts = await getPopularPodcastsUseCase.execute();
                setPodcasts(podcasts);
            } catch (err) {
                console.warn(err);
                setError('Error al obtener los podcasts más populares.');
            } finally {
                setLoading(false);
            }
        };

        fetchPodcasts();
    }, [getPopularPodcastsUseCase]);

    return { podcasts, loading, error };
};

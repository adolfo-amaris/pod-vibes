import { useState, useEffect } from 'react';
import { usePodcastService } from '../interfaces/PodcastServiceContext';

export const usePodcastDetails = (podcastId: string | null) => {
    const podcastService = usePodcastService();
    const [podcastDetails, setPodcastDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadDetails = async () => {
            if (!podcastId) return;
            try {
                setLoading(true);
                const details = await podcastService.fetchPodcastDetailsWithCache(podcastId);
                setPodcastDetails(details);
                setError(null);
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

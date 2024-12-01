import { useState, useMemo } from 'react';

export const usePodcastFilter = (episodes: any[], initialFilter = '') => {
    const [filter, setFilter] = useState(initialFilter);

    const filteredPodcasts = useMemo(() => {
        const lowercasedFilter = filter.toLowerCase();
        return episodes.filter((episode) => {
            const trackName = episode.trackName?.toLowerCase() || ''; // Validación para evitar undefined
            const description = episode.description?.toLowerCase() || ''; // Validación para evitar undefined
            return trackName.includes(lowercasedFilter) || description.includes(lowercasedFilter);
        });
    }, [filter, episodes]);

    return { filter, setFilter, filteredPodcasts };
};

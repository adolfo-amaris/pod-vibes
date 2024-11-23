import { useEffect, useState } from 'react';

export const usePodcastFilter = (episodes: any[], initialFilter = '') => {
    const [filter, setFilter] = useState(initialFilter);
    const [filteredPodcasts, setFilteredPodcasts] = useState(episodes);

    useEffect(() => {
        const lowercasedFilter = filter.toLowerCase();
        const filtered = episodes.filter((episode) => {
            const trackName = episode.trackName?.toLowerCase() || ''; // Validación para evitar undefined
            const description = episode.description?.toLowerCase() || ''; // Validación para evitar undefined
            return trackName.includes(lowercasedFilter) || description.includes(lowercasedFilter);
        });
        setFilteredPodcasts(filtered);
    }, [filter, episodes]);

    return { filter, setFilter, filteredPodcasts };
};

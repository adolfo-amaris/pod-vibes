import { useState, useMemo } from 'react';
import { Podcast } from '../../domain/entities/podcast';

export const usePodcastFilter = (podcasts: Podcast[]) => {
  const [filter, setFilter] = useState('');

  const filteredPodcasts = useMemo(() => {
    return podcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(filter.toLowerCase()) ||
        podcast.author.toLowerCase().includes(filter.toLowerCase())
    );
  }, [filter, podcasts]);

  return { filter, setFilter, filteredPodcasts };
};

import { Podcast } from './../../domain/entities/podcast';
import { Episode } from './../../domain/entities/episode';

export interface IPodcastService {
  fetchTopPodcasts(): Promise<Podcast[]>; // Devuelve un array de podcasts
  fetchPodcastDetails(podcastId: string): Promise<{ podcast: Podcast; episodes: Episode[] }>;
  fetchTopPodcastsWithCache(): Promise<Podcast[]>; // Devuelve un array de podcasts
  fetchPodcastDetailsWithCache(
    podcastId: string
  ): Promise<{ podcast: Podcast; episodes: Episode[] }>;
}

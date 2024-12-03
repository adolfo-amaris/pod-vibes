import { Podcast } from '../../domain/entities/podcast';
import { PodcastDetailsAPIResponse } from '../../domain/types/apiResponses';

export interface IPodcastService {
    fetchTopPodcasts(): Promise<Podcast[]>; // Devuelve un array de podcasts
    fetchPodcastDetails(podcastId: string): Promise<PodcastDetailsAPIResponse>;
    fetchTopPodcastsWithCache(): Promise<Podcast[]>; // Devuelve un array de podcasts
    fetchPodcastDetailsWithCache(podcastId: string): Promise<PodcastDetailsAPIResponse>;
}

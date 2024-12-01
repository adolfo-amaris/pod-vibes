export interface IPodcastService {
    fetchTopPodcasts(): Promise<any>;
    fetchPodcastDetails(podcastId: string): Promise<any>;
    fetchTopPodcastsWithCache(): Promise<any[]>;
    fetchPodcastDetailsWithCache(podcastId: string): Promise<any>;
}

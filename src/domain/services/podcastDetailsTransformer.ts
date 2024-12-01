export const transformPodcastDetails = (data: any) => {
    return {
        details: data.results[0],
        episodes: data.results.slice(1).map((episode: any) => ({
            trackId: episode.trackId,
            trackName: episode.trackName,
            description: episode.description,
            releaseDate: episode.releaseDate,
            episodeUrl: episode.episodeUrl,
            trackTimeMillis: episode.trackTimeMillis || 0,
        })),
    };
};

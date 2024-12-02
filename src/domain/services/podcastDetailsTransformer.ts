import { Episode } from "../entities/podcast";
import { PodcastDetailsAPIResponse, EpisodeAPIResponse } from "./../types/apiResponses";

export const transformPodcastDetails = (data: PodcastDetailsAPIResponse) => {
    const details = data.results[0];
    const episodes = data.results.slice(1).map((episode: EpisodeAPIResponse) => {
        try {
            return new Episode(
                episode.trackId,
                episode.trackName,
                episode.releaseDate,
                episode.trackTimeMillis || 0,
                episode.description,
                episode.episodeUrl
            );
        } catch (error) {
            // console.warn("Episodio inválido:", episode, error);
            return undefined;
        }
    }).filter((episode): episode is Episode => episode !== undefined);

    return { details, episodes };
};

import { Episode } from '../entities/episode';
import { PodcastDetail } from './../entities/podcastDetail';

import {
  PodcastDetailsAPIResponse,
  PodcastDetailsResponse,
} from './../types/apiResponses';

export const transformPodcastDetails = (
  data: PodcastDetailsAPIResponse
): PodcastDetailsResponse => {
  return {
    details: PodcastDetail.fromApiResponse(data.details), // Usar la nueva entidad
    episodes: data.episodes.map((episode) => {
      const ep = Episode.fromApiResponse(episode);
      return {
        id: ep.id,
        name: ep.title,
        releaseDate: ep.releaseDate,
        duration: ep.duration,
        description: ep.description,
        audioUrl: ep.audioUrl,
        isValidUrl: !!ep.audioUrl,
        formattedDuration: ep.formatDuration(),
      };
    }),
  };
};

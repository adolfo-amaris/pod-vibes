import { Podcast } from './../../domain/entities/podcast';
import { Episode } from './../../domain/entities/episode';
import { PodcastDetailsRawAPIResponse } from './../types/apiResponses';

export const transformPodcastDetails = (
  rawData: PodcastDetailsRawAPIResponse
): { podcast: Podcast; episodes: Episode[] } => {
  const { results } = rawData;

  if (!results || results.length === 0) {
    throw new Error('La respuesta de la API no contiene datos válidos.');
  }

  const [podcastData, ...episodeData] = results;

  if (podcastData.wrapperType !== 'track' || podcastData.kind !== 'podcast') {
    throw new Error('El campo principal no contiene un podcast válido.');
  }

  const podcast = new Podcast(
    podcastData.trackId.toString(),
    podcastData.trackName,
    podcastData.artistName,
    podcastData.artworkUrl600 || 'https://via.placeholder.com/600',
    podcastData.description || 'No description available'
  );

  const episodes = episodeData
    .map((episode) => {
      if (episode.kind !== 'podcast-episode') return null;

      return new Episode(
        episode.trackId.toString(),
        episode.trackName || 'Untitled',
        episode.description || 'No description available',
        episode.releaseDate || 'Unknown', // Mantener como string
        episode.trackTimeMillis || 0,
        episode.episodeUrl || ''
      );
    })
    .filter((episode) => episode !== null);

  return { podcast, episodes };
};

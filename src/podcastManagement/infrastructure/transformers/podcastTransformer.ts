import { Podcast } from '../../domain/entities/podcast';
import {
  PodcastFeedAPIResponse,
  PodcastAPIResponse,
} from '../types/apiResponses';

export const safeTransformPodcast = (
  entry: PodcastAPIResponse | null | undefined
): Podcast | undefined => {
  try {
    if (
      !entry ||
      !entry.id?.attributes?.['im:id'] ||
      !entry['im:name']?.label ||
      !entry['im:artist']?.label
    ) {
      throw new Error('Datos incompletos para crear el Podcast.');
    }

    const id = entry.id.attributes['im:id'];
    const name = entry['im:name'].label;
    const artist = entry['im:artist'].label;
    const image =
      entry['im:image']?.find((img) => img.attributes.height === '170')?.label ||
      'default-image-url';
    const summary = entry.summary?.label || 'Sin resumen disponible';

    return new Podcast(id, name, artist, image, summary);
  } catch (error) {
    console.warn('Error transformando el podcast:', entry, error);
    return undefined;
  }
};

export const transformPodcasts = (data: PodcastFeedAPIResponse): Podcast[] => {
  if (!data?.feed?.entry) {
    throw new Error('El formato de los datos de podcasts no es válido.');
  }

  return data.feed.entry
    .map(safeTransformPodcast)
    .filter((podcast): podcast is Podcast => podcast !== undefined);
};

// Tipo para la respuesta de podcasts populares
export interface PodcastAPIResponse {
  id: { attributes: { "im:id": string } };
  "im:name": { label: string };
  "im:image": { label: string; attributes: { height: string } }[];
  "im:artist": { label: string };
  summary: { label: string };
}

export interface PodcastFeedAPIResponse {
  feed: {
    entry: PodcastAPIResponse[];
  };
}

// Tipo para la respuesta de los detalles de un podcast y sus episodios
export interface PodcastDetailsAPIResponse {
  details: {
    id: string;
    name: string;
    description: string;
    artworkUrl: string;
  };
  episodes: {
    id: string;
    title: string;
    description?: string;
    duration: number;
    audioUrl: string;
    releaseDate: string;
  }[];
}

export interface PodcastDetailsRawAPIResponse {
  results: Array<{
    wrapperType: 'track';
    kind: string;
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName?: string;
    artworkUrl600?: string;
    description?: string;
    releaseDate?: string;
    trackTimeMillis?: number;
    episodeUrl?: string;
  }>;
}

// Detalles del podcast
export interface PodcastDetails {
  wrapperType: 'track';
  kind: 'podcast';
  trackId: number;
  trackName: string;
  collectionName: string;
  artworkUrl600: string;
  // Otras propiedades específicas del podcast (opcional, basado en respuesta)
}

// Detalles de un episodio
export interface EpisodeDetails {
  id: number;
  name: string;
  releaseDate: string;
  duration: number;
  description: string;
  audioUrl: string;
  formattedDuration?: string; // Asegúrate de incluir esta propiedad como opcional
}

export interface EpisodeAPIResponse {
  id: string;
  name?: string;
  description?: string;
  duration?: number;
  audioUrl?: string;
  releaseDate?: string;
}

// Tipo transformado para los detalles y episodios del podcast
export interface PodcastDetailsResponse {
  details: {
    id: string;
    name: string;
    description: string;
    artworkUrl: string;
  };
  episodes: {
    id: string;
    name: string;
    releaseDate: string;
    duration: number;
    description: string;
    audioUrl: string;
    isValidUrl: boolean;
    formattedDuration: string;
  }[];
}

export interface PodcastDetailAPIResponse {
  id: string;
  name: string;
  description: string;
  artworkUrl: string;
  episodes?: Array<{
    id: string;
    title: string;
    description?: string;
    duration: number;
    audioUrl: string;
    releaseDate: string;
  }>;
}
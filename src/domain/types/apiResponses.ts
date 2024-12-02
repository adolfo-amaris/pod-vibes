// Tipo para un episodio crudo devuelto por la API
export interface EpisodeAPIResponse {
    trackId: string;
    trackName: string;
    releaseDate: string;
    trackTimeMillis?: number; // Puede ser opcional si no siempre está presente
    description?: string; // Campo opcional
    episodeUrl?: string; // URL del episodio
}

// Tipo para la respuesta de los detalles de un podcast con episodios
export interface PodcastDetailsAPIResponse {
    results: EpisodeAPIResponse[]; // Array de episodios, donde el primer elemento es el detalle del podcast
}

// Tipo para la respuesta de podcasts populares
export interface PodcastAPIResponse {
    id: { attributes: { 'im:id': string } };
    'im:name': { label: string };
    'im:artist': { label: string };
    'im:image': { label: string }[];
}

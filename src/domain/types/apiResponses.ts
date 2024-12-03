// Tipo para la respuesta de podcasts populares
export interface PodcastAPIResponse {
    id: { attributes: { 'im:id': string } };
    'im:name': { label: string };
    'im:artist': { label: string };
    'im:image': { label: string }[];
}

// Tipo para la respuesta de los detalles de un podcast y sus episodios
export interface PodcastDetailsAPIResponse {
    details: {
        id: number;
        name: string;
        description: string;
        artworkUrl: string;
    };
    episodes: Array<{
        id: number;
        name: string;
        releaseDate: string;
        duration: number;
        description: string;
        audioUrl: string;
    }>;
}


// Detalles del podcast
export interface PodcastDetails {
    wrapperType: "track";
    kind: "podcast";
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

// Tipo transformado para los detalles y episodios del podcast
export interface PodcastDetailsResponse {
    details: {
        id: number;
        name: string;
        description: string;
        artworkUrl: string;
    };
    episodes: Array<{
        id: number;
        name: string;
        releaseDate: string;
        duration: number;
        description: string;
        audioUrl: string;
        isValidUrl: boolean;
        formattedDuration: string;
    }>;
}


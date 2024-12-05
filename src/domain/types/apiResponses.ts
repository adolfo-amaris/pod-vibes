// Tipo para la respuesta de podcasts populares
export interface PodcastAPIResponse {
    id: { attributes: { "im:id": string | null } } | null; // Permitir valores nulos
    "im:name": { label: string | null };
    "im:artist": { label: string | null };
    "im:image": { label: string | null }[]; // Permitir arrays vacíos y valores nulos
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
        name: string;
        description: string;
        duration: number;
        audioUrl: string;
        releaseDate: string;
    }[];
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


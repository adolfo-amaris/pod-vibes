export interface Podcast {
    id: string;
    title: string;
    author: string;
    image: string;
    description?: string;
}

export interface Episode {
    trackId: string;
    trackName: string;
    releaseDate: string;
    trackTimeMillis: number;
    description?: string;
    episodeUrl: string;
}


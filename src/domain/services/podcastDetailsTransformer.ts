import { PodcastDetailsAPIResponse, PodcastDetailsResponse } from "../types/apiResponses";

export const transformPodcastDetails = (data: PodcastDetailsAPIResponse): PodcastDetailsResponse => {
    return {
        details: {
            id: data.details.id,
            name: data.details.name,
            description: data.details.description || "Sin descripción",
            artworkUrl: data.details.artworkUrl || "",
        },
        episodes: data.episodes.map((episode) => ({
            id: episode.id,
            name: episode.name || "Sin título",
            releaseDate: episode.releaseDate || "Fecha desconocida",
            duration: episode.duration || 0,
            description: episode.description || "Descripción no disponible.",
            audioUrl: episode.audioUrl || "",
            isValidUrl: !!episode.audioUrl,
            formattedDuration: formatDuration(episode.duration || 0),
        })),
    };
};

const formatDuration = (millis: number): string => {
    if (!millis) return "Duración no disponible";
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

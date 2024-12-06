import { Episode } from "./episode";
import { PodcastDetailAPIResponse } from "./../types/apiResponses";

export class PodcastDetail {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly description: string,
        public readonly artworkUrl: string,
        public readonly episodes: Episode[]
    ) {
        if (!id) {
            throw new Error("El ID del podcast es obligatorio.");
        }
        if (!name) {
            throw new Error("El nombre del podcast es obligatorio.");
        }
        if (!artworkUrl) {
            throw new Error("La URL del artwork es obligatoria.");
        }
    }

    // Método estático para transformar datos de la API a una instancia de PodcastDetail
    public static fromApiResponse(data: PodcastDetailAPIResponse): PodcastDetail {
        if (!data) {
            throw new Error("Los datos del detalle del podcast no son válidos.");
        }

        // Validar que data.episodes sea un array antes de mapear
        const episodes = Array.isArray(data.episodes)
            ? data.episodes.map(Episode.fromApiResponse)
            : [];

        return new PodcastDetail(
            data.id,
            data.name,
            data.description || "Sin descripción",
            data.artworkUrl || "/default-image.jpg",
            episodes
        );
    }
}

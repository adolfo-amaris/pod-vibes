import { EpisodeAPIResponse } from "./../types/apiResponses";

export class Episode {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly duration: number, // Duración en segundos
        public readonly audioUrl: string,
        public readonly releaseDate: string
    ) {
        if (!id) {
            throw new Error("El ID del episodio es obligatorio.");
        }
        if (!title) {
            throw new Error("El título del episodio es obligatorio.");
        }
        if (!audioUrl) {
            throw new Error("La URL del audio es obligatoria.");
        }
    }

    // Método para formatear la duración del episodio
    public formatDuration(): string {
        const minutes = Math.floor(this.duration / 60000);
        const seconds = Math.floor((this.duration % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }


    // Método estático para transformar datos de la API a una instancia de Episode
    public static fromApiResponse(data: EpisodeAPIResponse): Episode {
        if (!data) {
            throw new Error("Los datos del episodio no son válidos.");
        }
        return new Episode(
            data.id,
            data.name || "Sin título",
            data.description || "Descripción no disponible.",
            data.duration || 0,
            data.audioUrl || "",
            data.releaseDate || "Fecha desconocida"
        );
    }
}

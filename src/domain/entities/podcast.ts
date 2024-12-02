export class Podcast {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly author: string,
        public readonly image: string
    ) {
        if (!id) {
            throw new Error("El ID del podcast es obligatorio.");
        }
        if (!title || title.length < 3) {
            throw new Error("El título del podcast debe tener al menos 3 caracteres.");
        }
        if (!author) {
            throw new Error("El autor del podcast es obligatorio.");
        }
        if (!image) {
            throw new Error("La imagen del podcast es obligatoria.");
        }
    }

    // Lógica de negocio: formato consistente del título
    get formattedTitle(): string {
        return this.title.toUpperCase();
    }
}

export class Episode {
    constructor(
        public readonly trackId: string,
        public readonly trackName: string,
        public readonly releaseDate: string,
        public readonly trackTimeMillis: number,
        public readonly description?: string,
        public readonly episodeUrl?: string
    ) {
        if (!trackId) {
            throw new Error("El trackId es obligatorio.");
        }
        if (!trackName || trackName.length < 3) {
            throw new Error("El nombre del episodio debe tener al menos 3 caracteres.");
        }
        if (trackTimeMillis <= 0) {
            throw new Error("La duración del episodio debe ser positiva.");
        }
        if (episodeUrl && !this.isValidUrl(episodeUrl)) {
            throw new Error(`URL inválida: ${episodeUrl}`);
        }
    }

    // Validación de URL
    private isValidUrl(url: string): boolean {
        const urlPattern = new RegExp(
            "^(https?:\\/\\/)?([\\w.-]+)?([a-z0-9.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$",
            "i"
        );
        return !!urlPattern.test(url);
    }

    // Lógica de negocio: conversión de duración a formato legible
    get formattedDuration(): string {
        const minutes = Math.floor(this.trackTimeMillis / 60000);
        const seconds = Math.floor((this.trackTimeMillis % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
}
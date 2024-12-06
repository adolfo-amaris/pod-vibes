import { Episode } from "./../../src/domain/entities/episode";

describe("Episode", () => {
    it("debería crear una instancia válida con datos correctos", () => {
        const episode = new Episode(
            "1",
            "Episodio 1",
            "Descripción del episodio",
            1200000,
            "audio1.mp3",
            "2023-12-01"
        );

        expect(episode.id).toBe("1");
        expect(episode.title).toBe("Episodio 1");
        expect(episode.formatDuration()).toBe("20:00");
    });

    it("debería lanzar error si faltan datos obligatorios", () => {
        expect(() => new Episode("", "Episodio 1", "Descripción", 1200000, "audio1.mp3", "2023-12-01")).toThrow();
        expect(() => new Episode("1", "", "Descripción", 1200000, "audio1.mp3", "2023-12-01")).toThrow();
        expect(() => new Episode("1", "Episodio 1", "Descripción", 1200000, "", "2023-12-01")).toThrow();
    });

    it("debería crear una instancia desde datos de la API", () => {
        const episode = Episode.fromApiResponse({
            id: "1",
            name: "Episodio 1",
            description: "Descripción del episodio",
            duration: 1200000,
            audioUrl: "audio1.mp3",
            releaseDate: "2023-12-01",
        });

        expect(episode.id).toBe("1");
        expect(episode.title).toBe("Episodio 1");
        expect(episode.formatDuration()).toBe("20:00");
    });
});

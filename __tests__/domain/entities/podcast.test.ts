import { Podcast } from "../../../src/podcastManagement/domain/entities/podcast";

describe("Entidad Podcast", () => {
  describe("Constructor y Validaciones", () => {
    it("debería crear una entidad Podcast con datos válidos", () => {
      const podcast = new Podcast(
        "123",
        "Charlas Tecnológicas",
        "Autor Tecnológico",
        "url-imagen.jpg",
        "Explorando lo último en tecnología"
      );

      expect(podcast.id).toBe("123");
      expect(podcast.title).toBe("Charlas Tecnológicas");
      expect(podcast.author).toBe("Autor Tecnológico");
      expect(podcast.image).toBe("url-imagen.jpg");
      expect(podcast.summary).toBe("Explorando lo último en tecnología");
    });

    it("debería lanzar un error si el ID está vacío", () => {
      expect(() => {
        new Podcast("", "Título", "Autor", "imagen.jpg", "Resumen");
      }).toThrow("El ID del podcast es obligatorio.");
    });

    it("debería lanzar un error si el título está vacío", () => {
      expect(() => {
        new Podcast("123", "", "Autor", "imagen.jpg", "Resumen");
      }).toThrow("El título del podcast es obligatorio.");
    });

    it("debería lanzar un error si el autor está vacío", () => {
      expect(() => {
        new Podcast("123", "Título", "", "imagen.jpg", "Resumen");
      }).toThrow("El autor del podcast es obligatorio.");
    });

    it("debería lanzar un error si la URL de la imagen está vacía", () => {
      expect(() => {
        new Podcast("123", "Título", "Autor", "", "Resumen");
      }).toThrow("La URL de la imagen es obligatoria.");
    });

    it("debería lanzar un error si el resumen está vacío", () => {
      expect(() => {
        new Podcast("123", "Título", "Autor", "imagen.jpg", "");
      }).toThrow("El resumen del podcast es obligatorio.");
    });
  });

  describe("Método getSafeImageUrl", () => {
    it("debería devolver la URL de la imagen si está definida", () => {
      const podcast = new Podcast(
        "123",
        "Título",
        "Autor",
        "imagen.jpg",
        "Resumen"
      );

      expect(podcast.getSafeImageUrl()).toBe("imagen.jpg");
    });

  });

  describe("Propiedad formattedTitle", () => {
    it("debería devolver el título en mayúsculas", () => {
      const podcast = new Podcast(
        "123",
        "Título en Minúsculas",
        "Autor",
        "imagen.jpg",
        "Resumen"
      );

      expect(podcast.formattedTitle).toBe("TÍTULO EN MINÚSCULAS");
    });
  });

  describe("Método getTruncatedTitle", () => {
    it("debería devolver el título completo si es más corto que el máximo", () => {
      const podcast = new Podcast(
        "123",
        "Título corto",
        "Autor",
        "imagen.jpg",
        "Resumen"
      );

      expect(podcast.getTruncatedTitle(20)).toBe("Título corto");
    });
  });
  
});

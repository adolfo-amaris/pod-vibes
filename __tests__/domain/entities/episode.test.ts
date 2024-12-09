import { Episode } from '../../../src/podcastManagement/domain/entities/episode';

describe('Entidad Episode', () => {
  describe('Constructor y Validaciones', () => {
    it('debería crear una entidad Episode con datos válidos', () => {
      const episode = new Episode(
        '123',
        'Título del episodio',
        'Descripción del episodio',
        '2023-12-01',
        3600,
        'audio-url.mp3'
      );

      expect(episode.id).toBe('123');
      expect(episode.title).toBe('Título del episodio');
      expect(episode.description).toBe('Descripción del episodio');
      expect(episode.releaseDate).toBe('2023-12-01');
      expect(episode.duration).toBe(3600);
      expect(episode.audioUrl).toBe('audio-url.mp3');
    });

    it('debería lanzar un error si el ID está vacío', () => {
      expect(() => {
        new Episode(
          '',
          'Título',
          'Descripción',
          '2023-12-01',
          3600,
          'audio-url.mp3'
        );
      }).toThrow('El ID del episodio es obligatorio.');
    });

    it('debería lanzar un error si el título está vacío', () => {
      expect(() => {
        new Episode(
          '123',
          '',
          'Descripción',
          '2023-12-01',
          3600,
          'audio-url.mp3'
        );
      }).toThrow('El título del episodio es obligatorio.');
    });

    it('debería lanzar un error si la URL del audio está vacía', () => {
      expect(() => {
        new Episode('123', 'Título', 'Descripción', '2023-12-01', 3600, '');
      }).toThrow('La URL del audio es obligatoria.');
    });
  });

  describe('Método formatDuration', () => {
    it('debería formatear correctamente la duración en minutos y segundos', () => {
      const episode = new Episode(
        '123',
        'Título',
        'Descripción',
        '2023-12-01',
        3650, // 60 minutos y 50 segundos
        'audio-url.mp3'
      );

      expect(episode.formatDuration()).toBe('60:50');
    });

    it('debería manejar correctamente duraciones menores a 10 segundos', () => {
      const episode = new Episode(
        '123',
        'Título',
        'Descripción',
        '2023-12-01',
        9, // Duración en segundos
        'audio-url.mp3'
      );

      expect(episode.formatDuration()).toBe('0:09');
    });
  });

  describe('Método estático fromApiResponse', () => {
    it('debería transformar correctamente una respuesta de la API a una instancia de Episode', () => {
      const apiResponse = {
        id: '123',
        name: 'Episodio desde API',
        description: 'Descripción desde API',
        releaseDate: '2023-12-01',
        duration: 1800,
        audioUrl: 'audio-url-api.mp3',
      };

      const episode = Episode.fromApiResponse(apiResponse);

      expect(episode.id).toBe('123');
      expect(episode.title).toBe('Episodio desde API');
      expect(episode.description).toBe('Descripción desde API');
      expect(episode.releaseDate).toBe('2023-12-01');
      expect(episode.duration).toBe(1800);
      expect(episode.audioUrl).toBe('audio-url-api.mp3');
    });

    it('debería asignar valores predeterminados si faltan datos en la respuesta de la API', () => {
      const apiResponse = {
        id: '123',
      };

      const episode = Episode.fromApiResponse(apiResponse);

      expect(episode.id).toBe('123');
      expect(episode.title).toBe('Sin título');
      expect(episode.description).toBe('Descripción no disponible.');
      expect(episode.releaseDate).toBe('Fecha desconocida');
      expect(episode.duration).toBe(0);
      expect(episode.audioUrl).toBe('URL no disponible');
    });

    it('debería lanzar un error si los datos de la API son inválidos', () => {
      const invalidApiResponse = null; // Simula un caso de datos inválidos.

      expect(() => {
        Episode.fromApiResponse(invalidApiResponse as never); // Usamos `never` para indicar que no debería ser válido.
      }).toThrow('Los datos del episodio no son válidos.');
    });
  });
});

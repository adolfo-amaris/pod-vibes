import { safeTransformPodcast, transformPodcasts } from '../../../src/podcastManagement/infrastructure/transformers/podcastTransformer';
import { Podcast } from '../../../src/podcastManagement/domain/entities/podcast';

describe('safeTransformPodcast', () => {
  it('debería transformar correctamente un podcast válido', () => {
    const validPodcast = {
      id: { attributes: { 'im:id': '123' } },
      'im:name': { label: 'Podcast A' },
      'im:artist': { label: 'Author A' },
      'im:image': [{ attributes: { height: '170' }, label: 'image-a.jpg' }],
      summary: { label: 'Summary A' },
    };

    const result = safeTransformPodcast(validPodcast);

    expect(result).toEqual(new Podcast('123', 'Podcast A', 'Author A', 'image-a.jpg', 'Summary A'));
  });

  it('debería manejar datos incompletos correctamente', () => {
    const invalidPodcast = {
      id: { attributes: { 'im:id': '' } },
      'im:name': { label: '' },
      'im:artist': { label: '' },
      'im:image': [],
      summary: { label: '' },
    };

    const result = safeTransformPodcast(invalidPodcast);

    expect(result).toBeUndefined();
  });

  it('debería manejar una entrada nula o indefinida', () => {
    const resultNull = safeTransformPodcast(null);
    const resultUndefined = safeTransformPodcast(undefined);

    expect(resultNull).toBeUndefined();
    expect(resultUndefined).toBeUndefined();
  });

  it('debería asignar valores predeterminados si faltan algunas propiedades opcionales', () => {
    const partialPodcast = {
      id: { attributes: { 'im:id': '124' } },
      'im:name': { label: 'Podcast Parcial' },
      'im:artist': { label: 'Author Parcial' },
      'im:image': [], // Provisión de una lista vacía
      summary: { label: '' }, // Resumen vacío
    };

    const result = safeTransformPodcast(partialPodcast);

    expect(result).toEqual(new Podcast('124', 'Podcast Parcial', 'Author Parcial', 'default-image-url', 'Sin resumen disponible'));
  });
});

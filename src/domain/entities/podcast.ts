import { PodcastAPIResponse } from './../types/apiResponses';

export class Podcast {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly image: string
  ) {
    if (!id) throw new Error('El ID del podcast es obligatorio.');
    if (!title) throw new Error('El título del podcast es obligatorio.');
    if (!author) throw new Error('El autor del podcast es obligatorio.');
    if (!image) throw new Error('La URL de la imagen es obligatoria.');
  }

  // Método para obtener una versión segura de la URL de la imagen
  public getSafeImageUrl(defaultImage: string = '/default-image.jpg'): string {
    return this.image || defaultImage;
  }

  // Lógica de negocio: formato consistente del título
  get formattedTitle(): string {
    return this.title.toUpperCase();
  }

  // Método para truncar el título si es demasiado largo
  public getTruncatedTitle(maxLength: number = 50): string {
    return this.title.length > maxLength
      ? `${this.title.substring(0, maxLength)}...`
      : this.title;
  }

  // Método estático para transformar datos de la API a una instancia de Podcast
  public static fromApiResponse(data: PodcastAPIResponse): Podcast {
    if (!data) {
      throw new Error('Los datos del podcast no son válidos.');
    }

    const id = data?.id?.attributes?.['im:id'];
    const title = data?.['im:name']?.label;
    const author = data?.['im:artist']?.label;
    const image = data?.['im:image']?.[2]?.label; // Usa la tercera imagen como predeterminada

    if (!id || !title || !author || !image) {
      throw new Error('Datos incompletos para crear un Podcast.');
    }

    return new Podcast(id, title, author, image);
  }
}

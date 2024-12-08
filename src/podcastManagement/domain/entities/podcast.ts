export class Podcast {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly author: string,
    public readonly image: string,
    public readonly summary: string
  ) {
    this.validateFields();
  }

  private validateFields(): void {
    if (!this.id) throw new Error('El ID del podcast es obligatorio.');
    if (!this.title) throw new Error('El título del podcast es obligatorio.');
    if (!this.author) throw new Error('El autor del podcast es obligatorio.');
    if (!this.image) throw new Error('La URL de la imagen es obligatoria.');
    if (!this.summary)
      throw new Error('El resumen del podcast es obligatorio.');
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
}

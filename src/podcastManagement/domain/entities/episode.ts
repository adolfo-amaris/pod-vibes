import { EpisodeAPIResponse } from '../../infrastructure/types/apiResponses';

export class Episode {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly description: string,
    public readonly releaseDate: string,
    public readonly duration: number, // Duración en segundos
    public readonly audioUrl: string
  ) {
    this.validateFields();
  }

  private validateFields(): void {
    if (!this.id) throw new Error('El ID del episodio es obligatorio.');
    if (!this.title) throw new Error('El título del episodio es obligatorio.');
    if (!this.audioUrl || this.audioUrl.trim() === '') {
      throw new Error('La URL del audio es obligatoria.');
    }
  }

  // Método para formatear la duración del episodio
  public formatDuration(): string {
    const minutes = Math.floor(this.duration / 60); // Obtiene minutos enteros
    const seconds = this.duration % 60; // Calcula los segundos restantes
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Formatea los segundos
  }

  // Método estático para transformar datos de la API a una instancia de Episode
  public static fromApiResponse(data: EpisodeAPIResponse): Episode {
    if (!data) {
      throw new Error('Los datos del episodio no son válidos.');
    }
    return new Episode(
      data.id,
      data.name || 'Sin título',
      data.description || 'Descripción no disponible.',
      data.releaseDate || 'Fecha desconocida',
      data.duration || 0,
      data.audioUrl || 'URL no disponible' // Valor predeterminado válido
    );
  }
}

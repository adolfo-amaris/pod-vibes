import { Podcast } from "../entities/podcast";
import { PodcastAPIResponse } from "./../types/apiResponses";

export const transformPodcasts = (rawPodcasts: PodcastAPIResponse[]): Podcast[] => {
    return rawPodcasts
        .map((entry) => {
            try {
                return Podcast.fromApiResponse(entry); // Usar el método estático de la entidad
            } catch (error) {
                // console.warn("Datos incompletos en el podcast:", entry, error);
                return undefined;
            }
        })
        .filter((podcast): podcast is Podcast => podcast !== undefined); // Filtrar undefined y asegurar el tipo
};

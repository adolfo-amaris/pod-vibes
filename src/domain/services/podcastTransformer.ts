import { Podcast } from "../entities/podcast";

export const transformPodcasts = (rawPodcasts: any[]): Podcast[] => {
    return rawPodcasts
        .map((entry) => {
            // Verificar que las propiedades necesarias existan
            const id = entry.id?.attributes?.['im:id'];
            const title = entry['im:name']?.label;
            const author = entry['im:artist']?.label;
            const image = entry['im:image']?.[2]?.label;

            if (!id || !title || !author || !image) {
                console.warn("Datos incompletos en el podcast:", entry);
                return undefined; // Usar undefined en lugar de null
            }

            return {
                id,
                title,
                author,
                image,
            };
        })
        .filter((podcast): podcast is Podcast => podcast !== undefined); // Filtrar undefined y asegurar el tipo
};

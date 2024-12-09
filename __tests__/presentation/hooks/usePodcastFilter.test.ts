import { renderHook, act } from '@testing-library/react';
import { usePodcastFilter } from '../../../src/podcastManagement/presentation/hooks/usePodcastFilter';
import { Podcast } from '../../../src/podcastManagement/domain/entities/podcast';

describe('usePodcastFilter', () => {
    const mockPodcasts: Podcast[] = [
        new Podcast('1', 'Podcast A', 'Author A', 'image-a.jpg', 'Summary A'),
        new Podcast('2', 'Podcast B', 'Author B', 'image-b.jpg', 'Summary B'),
        new Podcast('3', 'Other Podcast', 'Other Author', 'image-c.jpg', 'Summary C'),
    ];

    it('debería inicializar correctamente con un filtro vacío', () => {
        const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

        expect(result.current.filter).toBe('');
        expect(result.current.filteredPodcasts).toEqual(mockPodcasts);
    });

    it('debería filtrar podcasts por título', () => {
        const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

        act(() => {
            result.current.setFilter('Podcast A');
        });

        expect(result.current.filter).toBe('Podcast A');
        expect(result.current.filteredPodcasts).toEqual([mockPodcasts[0]]);
    });

    it('debería filtrar podcasts por autor', () => {
        const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

        act(() => {
            result.current.setFilter('Author B');
        });

        expect(result.current.filter).toBe('Author B');
        expect(result.current.filteredPodcasts).toEqual([mockPodcasts[1]]);
    });

    it('debería manejar el caso en que no hay coincidencias', () => {
        const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

        act(() => {
            result.current.setFilter('No Match');
        });

        expect(result.current.filter).toBe('No Match');
        expect(result.current.filteredPodcasts).toEqual([]);
    });

    it('debería ser insensible a mayúsculas y minúsculas', () => {
        const { result } = renderHook(() => usePodcastFilter(mockPodcasts));

        act(() => {
            result.current.setFilter('podcast b');
        });

        expect(result.current.filter).toBe('podcast b');
        expect(result.current.filteredPodcasts).toEqual([mockPodcasts[1]]);
    });
});

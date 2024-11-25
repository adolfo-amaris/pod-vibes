import React, { useEffect, useState } from 'react';
import { usePodcastService } from './../../../../shared/context/PodcastServiceContext';
import Card from './../../components/PodcastCard';
import { useLoading } from './../../../../shared/context/LoadingContext';
import { usePodcastFilter } from './../../hooks/usePodcastFilter';
import { useNavigate } from 'react-router-dom';
import Filter from './../../components/Filter';
import './../../styles/homePage.scss';

const HomePage: React.FC = () => {
	const podcastService = usePodcastService(); // Usar el servicio desde el contexto
    const initialPodcasts = JSON.parse(localStorage.getItem('podcasts') || '[]');
    const [podcasts, setPodcasts] = useState<any[]>(initialPodcasts);
    const { filter, setFilter, filteredPodcasts } = usePodcastFilter(podcasts);
    const { loading, setLoading } = useLoading(); // Uso del estado global de carga
    const navigate = useNavigate(); // Navegar para diferentes páginas


    useEffect(() => {

        const loadPodcasts = async () => {
            try {
                setLoading(true);
                const data = await podcastService.fetchTopPodcastsWithCache();
                setPodcasts(data);
                localStorage.setItem('podcasts', JSON.stringify(data));
            } catch (error) {
                console.error('Error al cargar los podcasts:', error);
            } finally {
                setLoading(false);
            }
        };

		loadPodcasts();

	}, [setLoading]);

	return (

		loading ? (
			<p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando los podcast más populares...</p>
		) : (
			<div
				className='boxppal flex flex-column'
				role="podcast-list"
			>
				<div className="boxfilter">
					<Filter
						filter={filter}
						setFilter={setFilter}
						placeholder="Filter podcasts..."
						count={filteredPodcasts.length}
					/>
				</div>


				{filteredPodcasts && filteredPodcasts.length > 0 ? (
					<div className='boxppal__card'>
						{filteredPodcasts.map((podcast) => (
							<Card
								key={podcast.id}
								image={podcast.image}
								title={podcast.title}
								author={podcast.author}
                                onClick={() => navigate(`/podcast/${podcast.id}`)}
							/>
						))}
					</div>
				) : (
					<p className='boxppal__not-found' >No se encontraron resultados.</p>
				)}
			</div>
		)

	);
};

export default HomePage;

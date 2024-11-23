import React, { useEffect, useState } from 'react';
import { podcastService  } from '../../services/podcastService';
import Card from '../../components/Card/Card';
import { useLoading } from '../../context/LoadingContext';
import { useNavigation } from '../../context/NavigationContext';
import PodcastDetailPage from '../PodcastDetailPage/PodcastDetailPage';
import Filter from '../../components/Filter/Filter';
import { usePodcastFilter } from '../../hook/usePodcastFilter';
import './../../styles/homePage.scss';

const HomePage: React.FC = () => {
	const initialPodcasts = JSON.parse(localStorage.getItem('podcasts') || '[]');
	const [podcasts, setPodcasts] = useState<any[]>(initialPodcasts);
	const { setSelectedPodcast, selectedPodcast } = useNavigation();
	const { filter, setFilter, filteredPodcasts } = usePodcastFilter(podcasts);

	const { loading, setLoading } = useLoading(); // Uso del estado global de carga

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


	// Renderiza el detalle del podcast si hay uno seleccionado
	if (selectedPodcast) {
		return <PodcastDetailPage />;
	}

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
								onClick={() => setSelectedPodcast(podcast)}
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

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { fetchTopPodcastsWithCache } from '../../services/podcastService';
import Card from '../../components/Card/Card';
import { useLoading } from '../../context/LoadingContext';
import { useNavigation } from '../../context/NavigationContext';
import PodcastDetailPage from '../PodcastDetailPage/PodcastDetailPage';
import Filter from '../../components/Filter/Filter';
import './../../styles/homePage.scss';

const HomePage: React.FC = () => {
	const initialPodcasts = JSON.parse(localStorage.getItem('podcasts') || '[]');
	const [podcasts, setPodcasts] = useState<any[]>(initialPodcasts);
	const { setSelectedPodcast, selectedPodcast } = useNavigation();
	const [filter, setFilter] = useState('');
	const [filteredPodcasts, setFilteredPodcasts] = useState<any[]>(initialPodcasts);
	const { loading, setLoading } = useLoading(); // Uso del estado global de carga

	useEffect(() => {

		const loadPodcasts = async () => {

			try {
				setLoading(true);
				const data = await fetchTopPodcastsWithCache();
				setPodcasts(data);
				setFilteredPodcasts(data);
				localStorage.setItem('podcasts', JSON.stringify(data));
			} catch (error) {
				console.error('Error al cargar el listado podcasts:', error);
			} finally {
				setLoading(false);
			}

		};

		loadPodcasts();

	}, [setLoading]);

	useEffect(() => {
		const lowercasedFilter = filter.toLowerCase();
		const filtered = podcasts.filter(
			(podcast) =>
				podcast.title.toLowerCase().includes(lowercasedFilter) ||
				podcast.author.toLowerCase().includes(lowercasedFilter)
		);
		setFilteredPodcasts(filtered);
	}, [filter, podcasts]);

	// Lógica para el filtrado
	useEffect(() => {
		const lowercasedFilter = filter.toLowerCase();
		const filtered = podcasts.filter(
			(podcast) =>
				podcast.title.toLowerCase().includes(lowercasedFilter) ||
				podcast.author.toLowerCase().includes(lowercasedFilter)
		);
		setFilteredPodcasts(filtered);
	}, [filter, podcasts]);


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

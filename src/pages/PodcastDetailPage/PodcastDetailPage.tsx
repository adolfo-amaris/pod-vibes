import React, { useEffect, useState } from 'react';
import { fetchPodcastDetailsWithCache } from '../../services/podcastService';
import { useNavigation } from '../../context/NavigationContext';
import { useLoading } from '../../context/LoadingContext';
import EpisodeDetailPage from '../EpisodeDetailPage/EpisodeDetailPage';
import './../../styles/podcastDetailPage.scss';

const PodcastDetailPage: React.FC = () => {
	// Contexto de navegación para gestionar el podcast y episodio seleccionados
	const { selectedPodcast, setSelectedPodcast, selectedEpisode, setSelectedEpisode } = useNavigation();
	const [podcast, setPodcast] = useState<any>(null); // Estado para almacenar los detalles del podcast
	const { loading, setLoading } = useLoading(); // Uso del estado global de carga



	// Efecto para cargar los detalles del podcast al montar el componente
	useEffect(() => {
		
		window.scrollTo({ top: 0, behavior: 'smooth' });

		const loadPodcastDetails = async () => {

			if (!selectedPodcast) {
				console.error('No hay un podcast seleccionado');
				return;
			}

			try {
				setLoading(true);
				const data = await fetchPodcastDetailsWithCache(selectedPodcast.id); // Llama al servicio para obtener los detalles
				setPodcast(data); // Guarda los datos del podcast en el estado
			} catch (error) {
				console.error('Error al cargar los detalles del podcast:', error);
			} finally {
				setLoading(false);
			}

		};

		if (selectedPodcast) {
			loadPodcastDetails();
		}

	}, [selectedPodcast, loading]);

	console.log('Detalles del podcast:.... ', podcast, selectedPodcast);


	// Si no se pudo cargar el podcast, muestra un mensaje de error
	if (!podcast && !loading) {

		return (
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<p>Error al cargar los detalles del podcast. Por favor, inténtalo de nuevo más tarde.</p>
				<button
					onClick={() => setSelectedPodcast(null)} // Permite volver al listado de podcasts
					style={{
						padding: '10px 20px',
						fontSize: '16px',
						backgroundColor: '#007BFF',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Volver
				</button>
			</div>
		);

	}

	if (!podcast || !podcast.episodes || !selectedPodcast) {
		return <p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando detalles del podcast...</p>;
	}

	// Función para formatear la duración de los episodios
	const formatDuration = (millis: number) => {
		if (!millis) return "Duración no disponible"; // Maneja el caso cuando millis es undefined
		const minutes = Math.floor(millis / 60000);
		const seconds = ((millis % 60000) / 1000).toFixed(0);
		return `${minutes}:${seconds.padStart(2, '0')}`;
	};


	// Renderiza el detalle del podcast y la lista de episodios
	return (
		<div className='boxdetail flex'>



			{/* Detalles del podcast */}
			<div className='boxdetail__container boxstyles'>
				{/* Botón para volver al listado de podcasts */}
				<button
					onClick={() => setSelectedPodcast(null)}
					style={{
						marginTop: '20px',
						padding: '10px 20px',
						fontSize: '16px',
						backgroundColor: '#007BFF',
						color: '#fff',
						border: 'none',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					Volver a podcasts
				</button>

				<div className='boxdetail__boxpodcast flex flex-column'>
					<img
						className='boxpodcast_img'
						src={podcast.details.artworkUrl600}
						alt={podcast.details.collectionName}

					/>
					<hr />

					<div className='boxpodcast_name'>
						<h1>{selectedPodcast.title}</h1>
						<h3>by {selectedPodcast.author}</h3>
					</div>

					<hr />

					<p className='boxpodcast_description'>
						<span>Description:</span>
						<br />
						<br />
						{selectedPodcast.description || 'No hay descripción disponible.'}
					</p>
				</div>
			</div>

			{/* Lista de episodios */}


			{
				selectedEpisode ? (
					<EpisodeDetailPage />
				): (
					<div className='boxepisode__list'>

						<h1 className="container__title boxstyles">Episodes: {podcast.episodes.length}</h1>
						<div className="episodes boxstyles">

							<div className="episodes__card">
								<div className="episodes__card-title">Title</div>
								<div className="episodes__card-date">Date</div>
								<div className="episodes__card-duration">Duration</div>
							</div>

							{podcast.episodes.map((episode: any) => (
								<div
									className="episodes__card effects boxstyles"
									key={episode.trackId}
									onClick={() => {
										setSelectedEpisode(episode); // Guarda el episodio seleccionado en el contexto
									}}
								>
									<div className="episodes__card-title">{episode.trackName}</div>
									<div className="episodes__card-date">1/3/2016</div>
									<div className="episodes__card-duration">{formatDuration(episode.trackTimeMillis)}</div>
								</div>
							))}

						</div>

					</div>
				) 
			}
			

		</div>
	);
};

export default PodcastDetailPage;

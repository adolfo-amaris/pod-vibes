import React from 'react';
import { useNavigation } from '../../context/NavigationContext';
import EpisodeDetailPage from '../EpisodeDetailPage/EpisodeDetailPage';
import { usePodcastDetails } from '../../hook/usePodcastDetails';
import Filter from '../../components/Filter/Filter';
import { usePodcastFilter } from '../../hook/usePodcastFilter';
import './../../styles/podcastDetailPage.scss';

const PodcastDetailPage: React.FC = () => {
	const { selectedPodcast, setSelectedEpisode, selectedEpisode } = useNavigation();

	// Convertir undefined a null para cumplir con el tipo esperado
	const podcastId = selectedPodcast?.id ?? null;

	// Obtener los detalles del podcast usando el hook
	const { podcastDetails, loading, error } = usePodcastDetails(podcastId);

	// Filtrar episodios usando el hook de filtrado
	const { filter, setFilter, filteredPodcasts: filteredEpisodes } = usePodcastFilter(
		podcastDetails?.episodes || []
	);

	// window.scrollTo({ top: 0, behavior: 'smooth' });


	// Función para formatear la duración de los episodios
	const formatDuration = (millis: number) => {
		if (!millis) return "Duración no disponible"; // Maneja el caso cuando millis es undefined
		const minutes = Math.floor(millis / 60000);
		const seconds = ((millis % 60000) / 1000).toFixed(0);
		return `${minutes}:${seconds.padStart(2, '0')}`;
	};

	const formatDate = (releaseDate: string): string => {
		const parsedDate = new Date(releaseDate); // Convertir la cadena en un objeto Date
		const day = String(parsedDate.getDate()).padStart(2, '0'); // Día con dos dígitos
		const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos
		const year = parsedDate.getFullYear(); // Año

		return `${day}/${month}/${year}`; // Formato dd/mm/yyyy
	};

	// Renderiza el detalle del podcast y la lista de episodios
	return (
		!podcastDetails || !selectedPodcast || !podcastDetails.episodes  ? (
			<p style={{ textAlign: 'center', marginTop: '20px' }}>Cargando detalles del podcast...</p>
		) : (

			<div className='boxdetail flex'>
				{/* Detalles del podcast */}
				<div className='boxdetail__container boxstyles'>

					<div className='boxdetail__boxpodcast flex flex-column'>
						<img
							className='boxpodcast_img hoverEffect'
							src={podcastDetails.details.artworkUrl600}
							alt={podcastDetails.details.collectionName}
							onClick={() => setSelectedEpisode(null)}
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
					) : (
						<div className='boxepisode__list'>

							<div className='boxepisode__header flex flex-center justify-between boxstyles'>
								<h1 className="boxepisode__title">Episodes: {podcastDetails.episodes.length}</h1>
								<Filter
									filter={filter}
									setFilter={setFilter}
									placeholder="Filter episodes..."
									count={filteredEpisodes.length}
								/>
							</div>
							<div className="episodes flex flex-column boxstyles">

								<div className="episodes__card flex">
									<div className="episodes__card-title bold">Title</div>
									<div className="episodes__card-date bold">Date</div>
									<div className="episodes__card-duration bold">Duration</div>
								</div>

								{filteredEpisodes.map((episode: any) => (
									<div
										className="episodes__card flex hoverEffect boxstyles"
										key={episode.trackId}
										onClick={() => {
											setSelectedEpisode(episode); // Guarda el episodio seleccionado en el contexto
										}}
									>
										<div className="episodes__card-title">{episode.trackName}</div>
										<div className="episodes__card-date">{formatDate(episode.releaseDate)}</div>
										<div className="episodes__card-duration">{formatDuration(episode.trackTimeMillis)}</div>
									</div>
								))}

							</div>

						</div>
					)
				}
			</div>
		)
	);
};

export default PodcastDetailPage;

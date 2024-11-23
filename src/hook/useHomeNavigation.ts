import { useNavigation } from '../context/NavigationContext';

const useHomeNavigation = () => {
    const { setSelectedPodcast, setSelectedEpisode } = useNavigation();

    const handleHomeClick = () => {
        setSelectedPodcast(null); // Limpia el podcast seleccionado
        setSelectedEpisode(null); // Limpia el episodio seleccionado
    };

    return { handleHomeClick };
};

export default useHomeNavigation;

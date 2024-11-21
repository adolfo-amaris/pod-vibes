import React, { createContext, useContext, useState } from 'react';


interface Podcast {
    id: string;
    title: string;
    author: string;
    image: string;
    description: string;
}

interface NavigationContextType {
    selectedPodcast: Podcast | null;
    setSelectedPodcast: (podcast: Podcast | null) => void;
    selectedEpisode: any | null;
    setSelectedEpisode: (episode: any | null) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigation = () => {

    const context = useContext(NavigationContext);
    if (!context) {
        throw new Error('useNavigation debe usarse dentro de un NavigationProvider');
    }
    return context;
    
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [selectedPodcast, setSelectedPodcast] = useState<Podcast | null>(null);
    const [selectedEpisode, setSelectedEpisode] = useState<any | null>(null);

    return (
        <NavigationContext.Provider
            value={{ selectedPodcast, setSelectedPodcast, selectedEpisode, setSelectedEpisode }}
        >
            {children}
        </NavigationContext.Provider>
    );

};

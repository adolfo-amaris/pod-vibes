import React, { createContext, useContext, useState } from 'react';

interface NavigationContextType {
    selectedPodcast: string | null;
    setSelectedPodcast: (podcastId: string | null) => void;
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

    const [selectedPodcast, setSelectedPodcast] = useState<string | null>(null);
    const [selectedEpisode, setSelectedEpisode] = useState<any | null>(null);

    return (
        <NavigationContext.Provider
            value={{ selectedPodcast, setSelectedPodcast, selectedEpisode, setSelectedEpisode }}
        >
            {children}
        </NavigationContext.Provider>
    );

};

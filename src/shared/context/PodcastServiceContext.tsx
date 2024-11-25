import React, { createContext, useContext } from 'react';
import { PodcastService, podcastService } from './../../features/podcasts/services/podcastService';

const PodcastServiceContext = createContext<PodcastService | null>(null);

export const PodcastServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <PodcastServiceContext.Provider value={podcastService}>
            {children}
        </PodcastServiceContext.Provider>
    );
};

export const usePodcastService = (): PodcastService => {
    const context = useContext(PodcastServiceContext);
    if (!context) {
        throw new Error('usePodcastService debe usarse dentro de un PodcastServiceProvider');
    }
    return context;
};

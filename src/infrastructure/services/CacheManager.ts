export interface ICacheManager {
    getCache(key: string, duration: number): any | null;
    setCache(key: string, data: any): void;
}

export class CacheManager implements ICacheManager {
    getCache(key: string, duration: number): any | null {
        const cachedData = localStorage.getItem(key);
        const cachedTimestamp = localStorage.getItem(`${key}_timestamp`);
        if (cachedData && cachedTimestamp) {
            const isCacheValid = Date.now() - parseInt(cachedTimestamp, 10) < duration;
            if (isCacheValid) {
                return JSON.parse(cachedData);
            }
        }
        return null;
    }

    setCache(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(`${key}_timestamp`, Date.now().toString());
    }
}

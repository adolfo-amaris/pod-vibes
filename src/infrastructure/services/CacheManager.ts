export interface ICacheManager {
    getCache<T>(key: string, duration: number): T | null;
    setCache<T>(key: string, data: T): void;
}

export class CacheManager implements ICacheManager {
    getCache<T>(key: string, duration: number): T | null {
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

    setCache<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(`${key}_timestamp`, Date.now().toString());
    }
}

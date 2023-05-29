export type TStargeKey = "portfolio";

export const addToStorage = <T>(key: TStargeKey, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getFromStorage = <T>(key: TStargeKey): T | undefined => {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data) as T;
    }
    return;
};
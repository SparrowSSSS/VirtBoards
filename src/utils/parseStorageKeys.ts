export const parseStorageKey = (keys: string[], substring: string): string[] => {
    const boardNameKeys: string[] = [];

    keys.forEach(key => {
        if (key.includes(substring)) boardNameKeys.push(key);
    });

    return boardNameKeys;
};